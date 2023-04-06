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
db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="", db="pickpack")
engine = create_engine("mysql+pymysql://root:@j8b307.p.ssafy.io:3306/pickpack?charset=utf8")
conn = engine.connect()
cursor = db.cursor()


# SparkSession 생성
spark = SparkSession.builder.appName("Tendency").getOrCreate()

#start_date : 크롤링 시작 날짜
start_date = parse("2023-03-29").date()

# today_date : 오늘 날짜
today_date = date.today()
today_date = parse("2023-04-04").date()

# schema : hadoop에 있는 파일 읽어올 때 사용할 스키마
schema = StructType([
    StructField("key", StringType(), True),
    StructField("value", StringType(), True)
    ])


# 파일 읽기
todayDF = spark.read.option("sep", "\t").schema(schema).csv("hdfs://localhost:9000/user/output/"+str(today_date))
# todayDF = todayDF.withColumn("index", func.monotonically_increasing_id())
todayDF = todayDF.distinct()
# todayDF = todayDF.withColumn("priceT", func.col("price"))
todayDF = todayDF.drop("value")

########## todayDF : key

# sub : 과거 가격이 존재하는 날짜 수
sub = (today_date - start_date).days

# start_date부터 tody_date까지 for문
for i in tqdm(range(sub+1)):
    mid_date = start_date + datetime.timedelta(days=i)
    
    # 파일 읽기
    fileDF = spark.read.option("sep", "\t").schema(schema).csv("hdfs://localhost:9000/user/output/"+str(mid_date))
    fileDF = fileDF.distinct()
    fileDF = fileDF.withColumn("price", func.split(func.col("value"), "원").getItem(0))
    fileDF = fileDF.withColumn("price", func.col("price").cast("int"))
    fileDF = fileDF.drop("value")
     ############# fileDF : key, price

    inner_join = todayDF.join(fileDF, "key", "inner")
    inner_join = inner_join.withColumn("past_prices_temp", func.concat(func.lit("{\"date\":\"" + str(mid_date)), func.lit("\", \"price\":"), func.col("price"), func.lit("}, ") ))
    
    ############# inner_join : key, price, past_prices_temp

    if i == 0:
        resultDF = inner_join
        resultDF = resultDF.withColumn("acc", func.col("price"))
        resultDF = resultDF.withColumn("cnt", func.lit(1))
        resultDF = resultDF.withColumn("prev", func.col("price"))
        resultDF = resultDF.withColumn("updown", func.lit(0))
        # resultDF = resultDF.withColumn("past_prices", func.concat(func.lit("{\"date\":\"" + str(mid_date)), func.lit("\", \"price\":"), func.col("prev"), func.lit("}, ") ))
        resultDF = resultDF.withColumn("past_prices", func.col("past_prices_temp"))
        resultDF = resultDF.select("key", "acc", "cnt", "prev", "updown", "past_prices") 

        ########### resultDF : key, acc, cnt, prev, updown, past_prices

    else:
        resultDF = inner_join.join(resultDF, "key", "inner")        ########### resultDF : key, price, past_prices_temp, acc, cnt, prev, updown, past_prices
        resultDF = resultDF.withColumn("acc", func.col("acc") + func.col("price"))
        resultDF = resultDF.withColumn("cnt", func.col("cnt") + 1)
        resultDF = resultDF.withColumn("comparison", func.when(func.col("prev") < func.col("price"), 1).when(func.col("prev") > func.col("price"), -1).otherwise(0))
        resultDF = resultDF.withColumn("updown", func.when(func.col("comparison") == 1, func.when(func.col("updown") + func.col("comparison") > 0,  func.col("updown") + func.col("comparison")).otherwise(1)).when(func.col("comparison") == -1, func.when(func.col("updown") + func.col("comparison") < 0, func.col("updown") + func.col("comparison")).otherwise(-1)).otherwise(0))
        resultDF = resultDF.withColumn("prev", func.col("price"))
        resultDF = resultDF.withColumn("past_prices", func.concat(func.col("past_prices"), func.col("past_prices_temp")))
        resultDF = resultDF.drop("comparison").drop("price").drop("past_prices_temp")

        ########### resultDF : key, acc, cnt, prev, updown, past_prices
    print("===================================== resultDF " , resultDF.count())
    
# average, chg 컬럼 추가 후 필요한 컬럼 선택
resultDF = resultDF.withColumn("average", func.col("acc")/func.col("cnt"))
resultDF = resultDF.withColumn("chg", func.round((func.col("average")-func.col("prev"))/func.col("average"), 4)*100)
resultDF = resultDF.drop("acc").drop("prev").drop("cnt")

########### resultDF : key, updown, past_prices, average, chg



# ticket table SELECT
cursor.execute("SELECT ticket_id, index FROM ticket")

# 결과를 Python list로 변환
rows = cursor.fetchall()


# db_schema : ticket table을 담을 데이터프레임의 스키마
db_schema = StructType([
    StructField("ticket_id", IntegerType(), True),      # 0
    StructField("index", IntegerType(), True),     # 17
])



# Spark 데이터프레임으로 변환
tckDF = spark.createDataFrame(rows, schema=db_schema)

############ tckDF : ticket_id, index

todayDF = todayDF.withColumn("index", func.monotonically_increasing_id())

############ todayDF : key, index

ttDF = tckDF.join(todayDF, "index", "inner")
ttDF = ttDF.drop("index")

############ ttDF : ticket_id, key


resultDF = ttDF.join(resultDF, "key", "inner")
resultDF = resultDF.drop("key")
########### resultDF : key, updown, past_prices, average, chg, ticket_id

print("=====================================", resultDF.count())


resultPD = resultDF.toPandas()
# tendency table에 insert
with tqdm(total = len(resultPD.index), desc = "tendency insert") as pbar: 
    resultPD.to_sql(name="tendency", con=engine, if_exists="append", index=False)
    pbar.update(len(resultPD.index))


# MySQL 연결 닫기
conn.close()
db.close()


