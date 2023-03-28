from datetime import date
from time import sleep
import pymysql
import pandas as pd
from pyspark.sql import SparkSession
from tqdm import tqdm
pymysql.install_as_MySQLdb()

from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType


db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="", db="pickpack")
cursor = db.cursor()

spark = SparkSession.builder.appName("FlightService").getOrCreate()

###################################################################################################################

schema = StructType([
    StructField("key", StringType(), True),
    StructField("price", IntegerType(), True)
    ])
# load data
# hadoopDF : key = String, value = price
hadoopDF = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/spark_test/230324").toPandas()

# hadoopDF["info"] : 
# [ 티켓 정보 , 항공권 상세 정보1, 항공권 상세 정보2...]
hadoopDF["info"] = hadoopDF["key"].str.split(", ")
temp = hadoopDF["key"].str.split(", ")

# today_date : 오늘 날짜 (=크롤링한 날짜)
today_date = date.today()


# ticket column
ticket_col = ['price', 'waypoint_num', 'regist_date', 'total_time', "total_time_num", "codeshare", "airline", 
                "dep_time", "dep_date", "dep_name", "dep_code", "arr_time", "arr_date", "arr_name", "arr_code", "plus_date"]
# flight column
flight_col = ['ticket_id', "dep_time", "dep_date", "dep_name", "dep_code", "arr_time", "arr_date", "arr_name", "arr_code", 
                "wait_time", "flight_time", "code", "codeshare_name", "waypoint_name", "plus_date"]


# ticket 마다 loop
for tck in tqdm(range(len(hadoopDF))):
    # ticket info
    dep_date = hadoopDF["info"][tck][0]
    airline = hadoopDF["info"][tck][1]
    codeshare = False
    if hadoopDF["info"][tck][2] == "True":
        codeshare = True
    dep_code = hadoopDF["info"][tck][3]
    dep_time = hadoopDF["info"][tck][4]
    total_time = hadoopDF["info"][tck][5]
    total_time_num = int(hadoopDF["info"][tck][6])
    arr_name = hadoopDF["info"][tck][7]
    arr_time = hadoopDF["info"][tck][8]
    plus_date = int(hadoopDF["info"][tck][9])
    waypoint_num = int(hadoopDF["info"][tck][10])
    
    # detail_paths : 항공권 상세 정보 list
    detail_paths = []
    fht_len = (len(hadoopDF["info"][tck]) - 11) // 14
    # 항공권 상세 정보마다 loop
    for fht in range(fht_len):
        idx = 10 + fht * 14
        # idx+1 : wait_time, idx+2 : route_dep_time, idx+3 : route_dep_date, idx+4 : route_dep_name, idx+5 : route_dep_code, 
        # idx+6 : route_flight_time, idx+7 : flight_code, idx+8 : route_flight_share
        # idx+9 : waypoint_name, idx+10 : route_arr_time, idx+11 : plus_flight, idx+12 : route_arr_date, 
        # idx+13 : route_arr_name, idx+14 : route_arr_code
        wait_time = hadoopDF["info"][tck][idx+1] 
        route_dep_time = hadoopDF["info"][tck][idx+2]
        route_dep_date = hadoopDF["info"][tck][idx+3]
        route_dep_name = hadoopDF["info"][tck][idx+4]
        route_dep_code = hadoopDF["info"][tck][idx+5]
        route_flight_time = hadoopDF["info"][tck][idx+6]
        flight_code = hadoopDF["info"][tck][idx+7]
        route_flight_share = hadoopDF["info"][tck][idx+8]
        waypoint_name = hadoopDF["info"][tck][idx+9]
        route_arr_time = hadoopDF["info"][tck][idx+10]
        plus_flight = int(hadoopDF["info"][tck][idx+11])
        route_arr_date = hadoopDF["info"][tck][idx+12]
        route_arr_name = hadoopDF["info"][tck][idx+13]
        route_arr_code = hadoopDF["info"][tck][idx+14]

        # route_dep_time, route_dep_date, route_dep_name, route_dep_code, 
        # route_arr_time, route_arr_date, route_arr_name, route_arr_code,
        # wait_time, route_flight_time, flight_code, route_flight_share, waypoint_name, plus_flight
        detail_paths.append(
            (
                route_dep_time, route_dep_date, route_dep_name, route_dep_code, route_arr_time, route_arr_date, route_arr_name, route_arr_code,
                wait_time, route_flight_time, flight_code, route_flight_share, waypoint_name, plus_flight
            )
        )
    # ticket value
    ticket_value = [(
            hadoopDF['price'][tck], waypoint_num, today_date, total_time, total_time_num, codeshare, airline, 
            dep_time, dep_date, detail_paths[0][2], dep_code, arr_time, detail_paths[len(detail_paths)-1][5], detail_paths[len(detail_paths)-1][6], detail_paths[len(detail_paths)-1][7], plus_date
    )]

    # Is this a ticket already exists?
    str_codeshare = 'True' if codeshare else 'False'
    int_codeshare = 1 if codeshare else 0
    exist_sql = "select ticket_id, price from ticket where waypoint_num =  " + str(ticket_value[0][1]) + " and total_time = \'" + ticket_value[0][3] + "\' and airline = \'" + ticket_value[0][6] + \
    "\' and dep_time = \'" + ticket_value[0][7] + "\' and dep_date = \'" + ticket_value[0][8] +"\' and dep_name = \'" + ticket_value[0][9] + \
    "\' and codeshare = \'" + str(int_codeshare) + "\' and arr_time = \'" + ticket_value[0][11] + "\' and arr_date = \'" + ticket_value[0][12] +"\' and arr_name = \'" + ticket_value[0][13]+ "\'"
    
    #exist_result = pd.read_sql(exist_sql, db)
    cursor.execute(exist_sql)
    db.commit()
    exist_result = cursor.fetchall()

    if len(exist_result) == 0 :     # no -> new ticket. insert(ticket, flight)
        # ticket insert
        price = hadoopDF['price'][tck]
        dep_code = detail_paths[0][3]
        arr_date =detail_paths[len(detail_paths)-1][5]
        arr_name = detail_paths[len(detail_paths)-1][6]
        arr_code = detail_paths[len(detail_paths)-1][7]
        
        insert_sql_str = "INSERT INTO ticket (price, waypoint_num, regist_date, total_time, total_time_num, codeshare, airline, dep_time, dep_date, dep_name, dep_code, arr_time, arr_date, arr_name, arr_code, plus_date) " \
            +"VALUES(" + str(ticket_value[0][0]) + ", " + str(ticket_value[0][1]) +", \'" + str(ticket_value[0][2]) + "\' , \'" + ticket_value[0][3] + "\' , " + str(ticket_value[0][4]) + " , " + str_codeshare + " , \'" + ticket_value[0][6] +\
            "\' , \'" + ticket_value[0][7] + "\' , \'" + ticket_value[0][8] + "\' , \'" + ticket_value[0][9] + "\' , \'" + ticket_value[0][10] + "\' , \'" + ticket_value[0][11] + "\' , \'" + ticket_value[0][12] +\
            "\' , \'" + ticket_value[0][13] + "\' , \'" + ticket_value[0][14]+ "\' , " + str(ticket_value[0][15]) + ")"
        cursor.execute(insert_sql_str)
        db.commit()
        cursor.execute(exist_sql)
        db.commit()
        append_result = cursor.fetchall()
        ticket_id = append_result[0][0]
        # flight_insert
        for fht in range(len(detail_paths)): 
            # flight value
            flight_value = [(
                ticket_id, detail_paths[fht][0], detail_paths[fht][1], detail_paths[fht][2], detail_paths[fht][3],
                detail_paths[fht][4], detail_paths[fht][5], detail_paths[fht][6], detail_paths[fht][7],
                detail_paths[fht][8], detail_paths[fht][9], detail_paths[fht][10], detail_paths[fht][11], detail_paths[fht][12], detail_paths[fht][13]
            )]
            # flight data frame
            insert_sql_flight = "INSERT INTO flight (ticket_id, dep_time, dep_date, dep_name, dep_code, arr_time, arr_date, arr_name, arr_code, wait_time, flight_time, code, codeshare_name, waypoint_name, plus_date)" \
            +" VALUES(" + str(flight_value[0][0]) + ", \'" + flight_value[0][1] +"\', \'" + flight_value[0][2] + "\' , \'" + flight_value[0][3] + "\' , \'" + flight_value[0][4]  + "\' , \'" + flight_value[0][5] +\
            "\' , \'" + flight_value[0][6] + "\' , \'" + flight_value[0][7] + "\' , \'" + flight_value[0][8] + "\' , \'" + flight_value[0][9] + "\' , \'" + flight_value[0][10] + "\' , \'" + flight_value[0][11] +\
            "\' , \'" + flight_value[0][12] + "\' ,\'" +flight_value[0][13] + "\', " + str(flight_value[0][14])+ ")"
        
            cursor.execute(insert_sql_flight)
            db.commit()
    else:   # yes. update price
        ticket_id = int(exist_result[0][0])
        price_result = int(exist_result[0][1])
        cur_price = int(hadoopDF['price'][tck])
        
        if price_result != cur_price:
            update_sql = 'update ticket set price = ' + str(cur_price)+", regist_date =\'" + str(today_date) + "\' where ticket_id = " + str(ticket_id)
            cursor.execute(update_sql)
            db.commit()

# close
db.close()




