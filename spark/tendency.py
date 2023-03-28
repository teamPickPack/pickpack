import datetime
from tqdm import tqdm
import pymysql
import json
from sqlalchemy import create_engine, text
import pandas as pd
from datetime import date, timedelta
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType
from dateutil.parser import parse
from pyspark.sql import functions as func
from pyspark.sql.functions import expr, date_add

# MySQL DB 연결
db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="ssafy", db="test")
engine = create_engine("mysql+pymysql://root:ssafy@j8b307.p.ssafy.io:3306/test?charset=utf8")
conn = engine.connect()
cursor = db.cursor()

# SparkSession 생성
spark = SparkSession.builder.appName("Tendency").getOrCreate()

# schema : hadoop에 있는 파일 읽어올 때 사용할 스키마
schema = StructType([
    StructField("key", StringType(), True),
    StructField("price", IntegerType(), True)
    ])

# ticket table SELECT
cursor.execute("SELECT * FROM ticket")

# 결과를 Python list로 변환
rows = cursor.fetchall()


# db_schema : ticket table을 담을 데이터프레임의 스키마
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

# Spark 데이터프레임으로 변환
tckDF = spark.createDataFrame(data_with_string_date, schema=db_schema)
# time 형식을 5:00:00에서 05:00:00 형식으로 변환
tckDF = tckDF.withColumn("dep_time", func.lpad(func.col("dep_time"), 8,"0"))
tckDF = tckDF.withColumn("arr_time", func.lpad(func.col("arr_time"), 8,"0"))

# 가장 오래된 티켓이 등록된 날짜 구하기
tckDF = tckDF.sort("regist_date")

# start_date : db에 있는 티켓 중 가장 오래된 티켓이 등록된 날짜
start_date_str = tckDF.first()["regist_date"]

# today_date : 오늘 날짜
today_date = date.today()
start_date = parse(start_date_str).date()

# sub : 과거 가격이 존재하는 날짜 수
sub = (today_date - start_date).days

# result_schema : 항공권 가격 추이를 구하기 위해 사용하는 스키마
result_schema = StructType([
    StructField("ticket_id", IntegerType(), True),      
    StructField("price", IntegerType(), True),          
    StructField("acc", IntegerType(), True),          
    StructField("cnt", IntegerType(), True),          
    StructField("prev", IntegerType(), True),          
    StructField("updown", IntegerType(), True),          
    StructField("past_prices", StringType(), True),     
])

# start_date부터 tody_date까지 for문
for i in tqdm(range(sub+1)):
    mid_date = start_date + datetime.timedelta(days=i)
    
    # 파일 읽기
    lines = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/spark_test/"+str(mid_date))

    # ticket과 flight 정보가 들어있는 key 컬럼을 ', '를 기준으로 split     
    s_col = func.split(lines['key'], ', ')

    # fDF : s_col에서 필요한 정보만 선택. value 값인 가격 선택 
    fDF = lines.select(s_col.getItem(0).cast("string").alias("dep_date"), s_col.getItem(1).alias("airline"), s_col.getItem(2).alias("codeshare"), s_col.getItem(3).alias("dep_code"),\
                            s_col.getItem(4).alias("dep_time"), s_col.getItem(5).alias("total_time"), s_col.getItem(6).alias("total_time_num"), s_col.getItem(7).alias("arr_code"), \
                            s_col.getItem(8).alias("arr_time"), s_col.getItem(9).alias("plus_date"), s_col.getItem(10).alias("waypoint_num"), lines['price'].alias('priceT'))
    
    # plus_date와 waypoint_num을 연산을 위해 int 형으로 형변환
    fDF = fDF.withColumn("plus_date", func.col("plus_date").cast("int"))
    fDF = fDF.withColumn("waypoint_num", func.col("waypoint_num").cast("int"))
    
    # time 형식을 tckDF와 맞추기
    concat_str = ":00"
    fDF = fDF.withColumn("dep_time", func.concat(func.col("dep_time"), func.lit(":00")))
    fDF = fDF.withColumn("arr_time", func.concat(func.col("arr_time"), func.lit(":00")))

    # tckDF와 fDF를 inner join. (DB 정보인 tckDF와 파일 정보인 fDF를 inner join하여 DB에 있는 티켓만 남기기)
    join_col = ["dep_date", "airline", "codeshare", "dep_code", "dep_time", "total_time", "arr_code", "arr_time", "plus_date", "waypoint_num"]
    inner_join = tckDF.join(fDF, join_col, "inner")

    # 연산에 필요한 ticket_id와 priceT 컬럼만 선택
    inner_join = inner_join.select("ticket_id", "priceT")
    
    # 처음 읽는 파일이면 resultDF에 초기값 설정
    if i == 0:
        resultDF = inner_join.select("ticket_id", "priceT")
        resultDF = resultDF.withColumn("acc", func.col("priceT"))
        resultDF = resultDF.withColumn("cnt", func.lit(1))
        resultDF = resultDF.withColumn("prev", func.col("priceT"))
        resultDF = resultDF.withColumn("updown", func.lit(0))
        resultDF = resultDF.select("ticket_id", "acc", "cnt", "prev", "updown")
        resultDF = resultDF.withColumn("past_prices",func.lit("") )
        resultDF.select("ticket_id", "acc", "cnt", "prev", "updown", "past_prices")    
    else:   # 각 컬럼마다의 연산 수행
        resultDF = inner_join.join(resultDF, ["ticket_id"], "outer")
        resultDF = resultDF.withColumn("acc", func.col("acc") + func.col("priceT"))
        resultDF = resultDF.withColumn("cnt", func.col("cnt") + 1)
        resultDF = resultDF.withColumn("comparison", func.when(func.col("prev") < func.col("priceT"), 1).when(func.col("prev") > func.col("priceT"), -1).otherwise(0))
        resultDF = resultDF.withColumn("updown", func.when(func.col("comparison") == 1, func.when(func.col("updown") + func.col("comparison") > 0,  func.col("updown") + func.col("comparison")).otherwise(1)).when(func.col("comparison") == -1, func.when(func.col("updown") + func.col("comparison") < 0, func.col("updown") + func.col("comparison")).otherwise(-1)).otherwise(0))
        resultDF = resultDF.withColumn("prev", func.col("priceT"))
        resultDF = resultDF.withColumn("past_prices", 
                                       func.concat(func.col("past_prices"), func.lit("|{\"date\":\"" + str(mid_date)),func.lit("\", \"price\":"), func.col("priceT"), func.lit("}")))
        
        # tendency table에 넣을 때 필요한 컬럼만 선택
        resultDF = resultDF.select("ticket_id", "acc", "cnt", "prev", "updown", "past_prices")        

# average, chg 컬럼 추가 후 필요한 컬럼 선택
resultDF = resultDF.withColumn("average", func.col("acc")/func.col("cnt"))
resultDF = resultDF.withColumn("chg", func.round((func.col("average")-func.col("prev"))/func.col("average"), 4)*100)
resultDF = resultDF.select("ticket_id", "average", "chg", "updown")

# past_prices 컬럼의 값에 chg(변동폭) 데이터 추가
resultPD = resultDF.select("ticket_id", "past_prices", "average").toPandas()
for p in range(len(resultPD)):
    pp_split = resultPD["past_prices"][p].split("|")
    result = "["
    for q in range(1, len(pp_split)):
        temp = json.loads(pp_split[q])
        temp["chg"] = round((resultPD["average"][p]-temp["price"]) / resultPD["average"][p], 4)
        temp["chg"] = temp["chg"] * 100
        temp_str = json.dumps(temp)
        result+= temp_str + ", "
    result = result[:len(result)-2]
    result += "]"
    resultPD["past_prices"][p] = result

# resultDF2 : past_prices 를 구한 dataframe
resultDF2 = spark.createDataFrame(resultPD)
# 필요한 컬럼 선택
resultDF2 = resultDF2.select("ticket_id", "past_prices")

# resultDF와 resultDF2를 ticket_id로 inner join
resultDF = resultDF.join(resultDF2, "ticket_id", "inner")
# tendency_id 컬럼 추가
resultDF = resultDF.withColumn("tendency_id", func.monotonically_increasing_id()+1)

# spark dataframe을 pandas dataframe으로 변경
resultPD = resultDF.toPandas()
# tendency table에 insert
resultPD.to_sql(name="tendency", con=engine, if_exists="append", index=False)


# MySQL 연결 닫기
conn.close()
db.close()

