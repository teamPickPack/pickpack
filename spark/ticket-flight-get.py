from datetime import date
import pymysql
import pandas as pd
from pyspark.sql import SparkSession
#from tqdm import tqdm
from sqlalchemy import create_engine
pymysql.install_as_MySQLdb()
import MySQLdb

from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType

# data insert할 때 필요
db_connection_str = 'mysql+pymysql://root:ssafy@j8b307.p.ssafy.io:3306/test?charset=utf8'
db_connection = create_engine(db_connection_str)

conn = db_connection.connect()

db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="ssafy", db="test")
cursor = db.cursor()

spark = SparkSession.builder.appName("FlightService").getOrCreate()

####################################################################################

schema = StructType([
    StructField("key", StringType(), True),
    StructField("price", IntegerType(), True)
    ])
# load data
# hadoopDF : key = String, value = price
hadoopDF = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/spark_test/part-r-00000").toPandas()

# hadoopDF["info"] : 
# [ 티켓 정보 , 항공권 상세 정보1, 항공권 상세 정보2...]
hadoopDF["info"] = hadoopDF["key"].str.split(", ")
temp = hadoopDF["key"].str.split(", ")

# today_date : 오늘 날짜 (=크롤링한 날짜)
today_date = date.today()

# ticket 마다 loop
for tck in range(len(hadoopDF)):
    # ticket info
    dep_date = hadoopDF["info"][tck][0]
    airline = hadoopDF["info"][tck][1]
    codeshare = hadoopDF["info"][tck][2]
    departure = hadoopDF["info"][tck][3]
    dep_time = hadoopDF["info"][tck][4]
    total_time = hadoopDF["info"][tck][5]
    total_time_num = hadoopDF["info"][tck][6]
    destination = hadoopDF["info"][tck][7]
    arr_time = hadoopDF["info"][tck][8]
    plus_date = int(hadoopDF["info"][tck][9])
    waypoint_num = int(hadoopDF["info"][tck][10])
    
    # detail_paths : 항공권 상세 정보 list
    detail_paths = []
    # 항공권 상세 정보마다 loop
    for fht in range(waypoint_num+1):
        idx = 10 + fht * 13
        # idx+1 : wait_time, idx+2 : route_dep_time, idx+3 : route_dep_date, idx+4 : route_dep_name
        # idx+5 : route_dep_code, idx+6 : route_flight_time, idx+7 : flight_code, idx+8 : route_flight_share
        # idx+9 : route_arr_time, idx+10 : plus_flight, idx+11 : route_arr_date, idx+12 : route_arr_name
        # idx+13 : route_arr_code
        detail_paths.append(
            (
                hadoopDF["info"][tck][idx+4], hadoopDF["info"][tck][idx+12], hadoopDF["info"][tck][idx+1], 
                hadoopDF["info"][tck][idx+2], hadoopDF["info"][tck][idx+3], hadoopDF["info"][tck][idx+9], hadoopDF["info"][tck][idx+11],
                hadoopDF["info"][tck][idx+6], hadoopDF["info"][tck][idx+7]
            )
        )

    
    # ticket column
    ticket_col = ['price', 'waypoint_num', 'regist_date', 'total_time', "total_time_num", "codeshare", "airline", "dep_time", "dep_date", "arr_time", "arr_date", "plus_date"]
    
    # ticket value
    ticket_value = [(hadoopDF['price'][tck], waypoint_num, today_date, total_time, total_time_num, codeshare, airline, dep_time, dep_date, arr_time, detail_paths[len(detail_paths)-1][6], plus_date)]
    
    # ticket data frame
    ticketDF = pd.DataFrame(data=ticket_value, columns=ticket_col)

    # is this a ticket already exists?
    exist_sql = 'select ticket_id from ticket where waypoint_num = ' + str(waypoint_num) + " and airline = \'" + airline + "\' and dep_time = \'" + dep_time + "\' and dep_date = \'" + dep_date + "\' and arr_time = \'" + arr_time + "\' and arr_date = \'" + str(detail_paths[len(detail_paths)-1][6]) + "\' and total_time_num = " + total_time_num
    exist_result = pd.read_sql(exist_sql, db)
    

    if exist_result.empty :     # no -> new ticket. insert
        ticketDF.to_sql(name="ticket", con=db_connection, if_exists="append", index=False)
    else:   # yes. update price
        update_sql = 'update ticket set price = ' + str(hadoopDF['price'][tck]) + " where ticket_id = " + str(exist_result['ticket_id'][0])
        cursor.execute(update_sql)
        db.commit()

# close
db.close()
conn.close()



