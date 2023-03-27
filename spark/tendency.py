import datetime
import pymysql
import json
from sqlalchemy import create_engine
import pandas as pd
from datetime import date, timedelta
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType
from dateutil.parser import parse
from pyspark.sql import functions as func
from pyspark.sql.functions import expr, date_add

db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="ssafy", db="test")
engine = create_engine("mysql+pymysql://root:ssafy@j8b307.p.ssafy.io:3306/test?charset=utf8")
conn = engine.connect()

# SparkSession 생성
spark = SparkSession.builder.appName("Tendency").getOrCreate()


schema = StructType([
    StructField("key", StringType(), True),
    StructField("price", IntegerType(), True)
    ])

cursor = db.cursor()
cursor.execute("SELECT * FROM ticket")

# 결과를 Python list로 변환
rows = cursor.fetchall()


# Spark 데이터프레임으로 변환
db_schema = StructType([
    StructField("ticket_id", IntegerType(), True),      # 0
    StructField("waypoint_num", IntegerType(), True),   # 2
    StructField("regist_date", StringType(), True),     # 3
    StructField("total_time", StringType(), True),      # 4
    StructField("codeshare", StringType(), True),       # 6
    StructField("airline", StringType(), True),         # 7
    StructField("dep_time", StringType(), True),        # 8
    StructField("dep_date", StringType(), True),        # 9
    StructField("dep_code", StringType(), True),        # 11
    StructField("arr_time", StringType(), True),        # 12
    StructField("arr_date", StringType(), True),        # 13
    StructField("arr_code", StringType(), True),        # 15
    StructField("plus_date", IntegerType(), True),      # 16
])

# datetime.date 타입을 문자열로 변환하여 컬럼 추가
data_with_string_date = []
for row in rows:
    codeshare_int = int.from_bytes(row[6], "big") 
    codeshare_str = 'True' if codeshare_int==1 else 'False'
    data_with_string_date.append((row[0], row[2], str(row[3]), row[4], codeshare_str, row[7], str(row[8]), str(row[9]), row[11], str(row[12]), str(row[13]), row[15], row[16]))

tckDF = spark.createDataFrame(data_with_string_date, schema=db_schema)
tckDF = tckDF.withColumn("dep_time", func.lpad(func.col("dep_time"), 8,"0"))
tckDF = tckDF.withColumn("arr_time", func.lpad(func.col("arr_time"), 8,"0"))
tckDF = tckDF.sort("regist_date")
tckDF.show()
# 로드한 DataFrame 출력


# start_date : db에 있는 티켓 중 가장 오래된 티켓이 등록된 날짜
start_date_str = tckDF.first()["regist_date"]
print("start_date_str", start_date_str, type(start_date_str))

# today_date : 오늘 날짜
today_date = date.today()
start_date = parse(start_date_str).date()
sub = (today_date - start_date).days

result_schema = StructType([
    StructField("ticket_id", IntegerType(), True),      
    StructField("price", IntegerType(), True),          
    StructField("acc", IntegerType(), True),          
    StructField("cnt", IntegerType(), True),          
    StructField("prev", IntegerType(), True),          
    StructField("updown", IntegerType(), True),          
    StructField("past_prices", StringType(), True),     
])

def getUpdown(updown, prev, priceT):
    if prev < priceT:
        return max(1, updown + 1)
    elif prev > priceT:
        return min(-1, updown-1)
    else:
        return 0
getUpdwon_udf = func.udf(getUpdown, IntegerType())

for i in range(sub+1):
    mid_date = start_date + datetime.timedelta(days=i)
    lines = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/spark_test/"+str(mid_date))
        
    s_col = func.split(lines['key'], ', ')
    fDF = lines.select(s_col.getItem(0).cast("string").alias("dep_date"), s_col.getItem(1).alias("airline"), s_col.getItem(2).alias("codeshare"), s_col.getItem(3).alias("dep_code"),\
                            s_col.getItem(4).alias("dep_time"), s_col.getItem(5).alias("total_time"), s_col.getItem(6).alias("total_time_num"), s_col.getItem(7).alias("arr_code"), \
                            s_col.getItem(8).alias("arr_time"), s_col.getItem(9).alias("plus_date"), s_col.getItem(10).alias("waypoint_num"), lines['price'].alias('priceT'))
    fDF = fDF.withColumn("plus_date", func.col("plus_date").cast("int"))
    fDF = fDF.withColumn("waypoint_num", func.col("waypoint_num").cast("int"))
    concat_str = ":00"
    fDF = fDF.withColumn("dep_time", func.concat(func.col("dep_time"), func.lit(":00")))
    fDF = fDF.withColumn("arr_time", func.concat(func.col("arr_time"), func.lit(":00")))

    join_col = ["dep_date", "airline", "codeshare", "dep_code", "dep_time", "total_time", "arr_code", "arr_time", "plus_date", "waypoint_num"]
    inner_join = tckDF.join(fDF, join_col, "inner")
    inner_join = inner_join.select("ticket_id", "priceT")
    
    if i == 0:
        resultDF = inner_join.select("ticket_id", "priceT")
        resultDF = resultDF.withColumn("acc", func.col("priceT"))
        resultDF = resultDF.withColumn("cnt", func.lit(1))
        resultDF = resultDF.withColumn("prev", func.col("priceT"))
        resultDF = resultDF.withColumn("updown", func.lit(0))
        resultDF = resultDF.select("ticket_id", "acc", "cnt", "prev", "updown")
        resultDF = resultDF.withColumn("past_prices",func.lit("") )
        resultDF.select("ticket_id", "acc", "cnt", "prev", "updown", "past_prices")    
    else:
        resultDF = inner_join.join(resultDF, ["ticket_id"], "outer")
        resultDF = resultDF.withColumn("acc", func.col("acc") + func.col("priceT"))
        resultDF = resultDF.withColumn("cnt", func.col("cnt") + 1)
        resultDF = resultDF.withColumn("prev", func.col("priceT"))
        resultDF = resultDF.withColumn("updown", getUpdwon_udf(func.col("updown"), func.col("prev"), func.col("priceT")))
        resultDF = resultDF.withColumn("past_prices", 
                                       func.concat(func.col("past_prices"), func.lit("|{\"date\":\"" + str(mid_date)),func.lit("\", \"price\":"), func.col("priceT"), func.lit("}")))
        # 필요 없는 컬럼 제거
        resultDF = resultDF.select("ticket_id", "acc", "cnt", "prev", "updown", "past_prices")        

resultDF = resultDF.withColumn("avg", func.col("acc")/func.col("cnt"))

resultPD = resultDF.select("ticket_id", "past_prices", "avg").toPandas()
print(resultPD)
print(resultPD["avg"][0])
print(type(resultPD["past_prices"][0]))
for p in range(len(resultPD)):
    pp_split = resultPD["past_prices"][p].split("|")
    result = "["
    for q in range(1, len(pp_split)):
        temp = json.loads(pp_split[q])
        temp["change"] = round((resultPD["avg"][p]-temp["price"]) / resultPD["avg"][p], 4)
        temp["change"] = temp["change"] * 100
        temp_str = json.dumps(temp)
        result+= temp_str + ", "
    result = result[:len(result)-2]
    result += "]"
    resultPD["past_prices"][p] = result
resultDF2 = spark.createDataFrame(resultPD)
resultDF2 = resultDF2.select("ticket_id", "past_prices")
resultDF = resultDF.withColumn("change", func.round((func.col("avg")-func.col("prev"))/func.col("avg"), 4)*100)
#resultDF = resultDF.select("ticket_id", "avg", "change", "updown")
resultDF = resultDF.join(resultDF2, "ticket_id", "inner")
resultDF.show()

resultPD = resultDF.toPandas()
#resultPD.to_sql(name="tendency", con=conn, if_exists="replace", index="False")


# MySQL 연결 닫기
conn.close()
db.close()

