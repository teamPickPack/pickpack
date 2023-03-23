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
#db_connection_str = 'mysql+pymysql://root:@j8b307.p.ssafy.io:3306/test?charset=utf8'
#db_connection = create_engine(db_connection_str)

#conn = db_connection.connect()


spark = SparkSession.builder.appName("FlightService").getOrCreate()

# ticket table schema
ticket_schema = StructType([\
    StructField("price", IntegerType(), True),
    StructField("waypoint_num", IntegerType(), True),
    StructField("regist_date", StringType(),True),
    StructField("total_time", StringType(), True),
    StructField("total_time_num", IntegerType(), True),
    StructField("codeshare", BooleanType(), True),
    StructField("airline", StringType(), True),
    StructField("dep_time", StringType(), True),
    StructField("dep_date", StringType(), True),
    StructField("arr_time", StringType(), True),
    StructField("arr_date", StringType(), True),
    StructField("plus_date", IntegerType(), True),    
    ])
#flight schema
flight_schema = StructType([
    StructField("ticket_id", LongType(), True),
    StructField("departure", StringType(), True),
    StructField("destination", StringType(), True),
    StructField("wait_time", StringType(), True),
    StructField("dep_time", StringType(), True),
    StructField("dep_date", StringType(), True),
    StructField("arr_time", StringType(), True),
    StructField("arr_date", StringType(), True),
    StructField("flight_time", StringType(), True),
    StructField("code", StringType(), True)
])
####################################################################################

today_date = datetime.date.today()

schema = StructType([
    StructField("key", StringType(), True),
    StructField("price", IntegerType(), True)
    ])
# load data
# hadoopDF : key = String, value = price
hadoopDF = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/spark_test/part-r-00000").toPandas()
# hadoopDF["info"] : 
# departure date, airline, codeshare, departure, dep_time, total_time, destination, arr_time, plus_date, waypoint_num
# 
hadoopDF["info"] = hadoopDF["key"].str.split(", ")

for tck in range(len(hadoopDF)):
    # ticket info
    dep_date = hadoopDF["info"][0]
    airline = hadoopDF["info"][1]
    codeshare = hadoopDF["info"][2]
    departure = hadoopDF["info"][3]
    dep_time = hadoopDF["info"][4]
    total_time = hadoopDF["info"][5]
    total_time_num = hadoopDF["info"][6]
    destination = hadoopDF["info"][7]
    arr_time = hadoopDF["info"][8]
    plus_date = hadoopDF["info"][9]
    waypoint_num = hadoopDF["info"][10]

    # detail path info
    for fht in range(waypoint_num+1):
        idx = 10 + fht * 13
        locals()['wait_time'] = hadoopDF["info"][idx+1]
        locals()['route_dep_time'] = hadoopDF["info"][idx+2]
        locals()['route_dep_date'] = hadoopDF["info"][idx+3]
        locals()['route_departure'] = hadoopDF["info"][idx+4]
        locals()['route_departure_code'] = hadoopDF["info"][idx+5]
        locals()['route_flight_time'] = hadoopDF["info"][idx+6]
        locals()['code'] = hadoopDF["info"][idx+7]
        locals()['route_flight_share'] = hadoopDF["info"][idx+8]
        locals()['route_arr_time'] = hadoopDF["info"][idx+9]
        locals()['plus_flight'] = hadoopDF["info"][idx+10]
        locals()['route_arr_date'] = hadoopDF["info"][idx+11]
        locals()['route_destination'] = hadoopDF["info"][idx+12]
        locals()['route_destination_code'] = hadoopDF["info"][idx+13]
    
    # ticket column
    ticket_col = ['price', 'waypoint_num', 'regist_date', 'total_time', "total_time_num", "codeshare", "airline", "dep_time", "dep_date", "arr_time", "arr_date", "plus_date"]
    # ticket value
    # ticket_value = (hadoopDF['price'], waypoint_num, total_time, total_time, total_time_num, codeshare, airline, dep_time, dep_date, arr_time, ,plus_date)
    







