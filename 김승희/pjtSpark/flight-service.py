from datetime import datetime
import os
import pymysql
import pandas as pd
from pyspark.sql import SparkSession
#from tqdm import tqdm
from sqlalchemy import create_engine
import pyspark
pymysql.install_as_MySQLdb()
import MySQLdb

from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType

# data insert할 때 필요
db_connection_str = 'mysql+pymysql://root:ssafy@j8b307.p.ssafy.io:3306/test?charset=utf8'
db_connection = create_engine(db_connection_str)

conn = db_connection.connect()


spark = SparkSession.builder.appName("FlightService").getOrCreate()

# ticket table schema
ticketSchema = StructType([\
    StructField("ticket_id", LongType(), True),
    StructField("price", IntegerType(), True),
    StructField("waypoint_num", IntegerType(), True),
    StructField("regist_date", StringType(),True),
    StructField("total_time", StringType(), True),
    StructField("codeshare", BooleanType(), True),
    StructField("airline", StringType(), True),
    StructField("dep_time", StringType(), True),
    StructField("dep_date", StringType(), True),
    StructField("arr_time", StringType(), True),
    StructField("arr_date", StringType(), True),
    StructField("plus_date", IntegerType(), True),    
    ])
schema = StructType([
    StructField("key", StringType(), True),
    StructField("value", IntegerType(), True)
    ])
# load data
# ticketDF : key = String, value = price
ticketDF = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/spark_test/part-r-00000").toPandas()
# splitTicketDF : crawling date, airline, codeshare?, departure, dep_time, total_time, arrive, arr_time, plus_date, waypoint_num
splitTicketDF = ticketDF["key"].str.split(",")


print(splitTicketDF[0][0])  #crawling date
print(splitTicketDF[0][1])  #airline
print(splitTicketDF[0][2])  #codeshare
print(splitTicketDF[0][3])  #departure
print(splitTicketDF[0][4])  #dep_time
print(splitTicketDF[0][5])  #total_time
print(splitTicketDF[0][6])  #arrive
print(splitTicketDF[0][7])  #arr_time
print(splitTicketDF[0][8])  #plus_date -> 앞에 + 떼서 보내달라고 하기
print(splitTicketDF[0][9])  #waypoint_num -> 앞에 경유 떼서 보내달라고 하기
