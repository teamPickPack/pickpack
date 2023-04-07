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

from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType

# data insert할 때 필요
db_connection_str = 'mysql+pymysql://root:@j8b307.p.ssafy.io:3306/pickpack?charset=utf8'
engine = create_engine(db_connection_str)


#db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="", db="test")
#cursor = db.cursor()

spark = SparkSession.builder.appName("FlightService").getOrCreate()

####################################### 찜 테이블 정보 저장 #######################################
with engine.begin() as conn:
    tckDBPD = pd.read_sql_table(table_name = "ticket", con=conn)
    onewayPD = pd.read_sql_table(table_name="oneway_ticket_like", con=conn)
    roundPD = pd.read_sql_table(table_name="round_ticket_like", con=conn)
    print(tckDBPD)
    tckDF = None if tckDBPD.empty else spark.createDataFrame(tckDBPD)
    onewayDF = None if onewayPD.empty else spark.createDataFrame(onewayPD)
    roundDF = None if roundPD.empty else spark.createDataFrame(roundPD)

if tckDF != None and onewayDF != None:
    onewayDF = onewayDF.join(tckDF, "ticket_id", "inner")
    onewayDF = onewayDF.drop("ticket_id").drop("oneway_ticket_like_id").drop("index").drop("price")

#onewayDF.show()

if tckDF != None and roundDF != None:
    # to ticket 
    roundDF1 = roundDF.withColumn("ticket_id", func.col("ticket_to_ticket_id"))
    roundDF1 = roundDF1.drop("ticket_to_ticket_id").drop("ticket_from_ticket_id").drop("index")
    roundDF1 = roundDF1.join(tckDF, "ticket_id", "inner")
    roundDF1 = roundDF1.drop("ticket_id").drop("price")

    #roundDF1.show()

    # from ticket 
    roundDF2 = roundDF.withColumn("ticket_id", func.col("ticket_from_ticket_id"))
    roundDF2 = roundDF2.drop("ticket_from_ticket_id").drop("ticket_to_ticket_id").drop("index")
    roundDF2 = roundDF2.join(tckDF, "ticket_id", "inner")
    roundDF2 = roundDF2.drop("ticket_id").drop("price")

    #roundDF2.show()



####################################### 테이블 drop & create #######################################

drop_tendency_sql = "drop table tendency "
drop_oneway_sql = "drop table oneway_ticket_like"
drop_round_sql = "drop table round_ticket_like"
drop_flight_sql = "drop table flight"
drop_ticket_sql = "drop table ticket"

create_ticket_sql =  "CREATE TABLE `ticket` (`ticket_id` bigint NOT NULL AUTO_INCREMENT,`airline` varchar(255) DEFAULT NULL,`arr_date` varchar(255) DEFAULT NULL,`arr_time` varchar(255) DEFAULT NULL,"\
    "`dep_date` varchar(255) DEFAULT NULL,`dep_time` varchar(255) DEFAULT NULL,`plus_date` int DEFAULT NULL,`price` int DEFAULT NULL,`total_time` varchar(255) DEFAULT NULL,`total_time_num` int DEFAULT NULL,"\
    "`waypoint_num` int DEFAULT NULL,`arr_code` varchar(255) DEFAULT NULL,`arr_name` varchar(255) DEFAULT NULL,`dep_code` varchar(255) DEFAULT NULL,`dep_name` varchar(255) DEFAULT NULL,`codeshare` bit(1) NOT NULL,"\
    "`regist_date` varchar(255) DEFAULT NULL,`index` bigint DEFAULT NULL,PRIMARY KEY (`ticket_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

create_flight_sql ="CREATE TABLE `flight` (`flight_id` bigint NOT NULL AUTO_INCREMENT,`arr_date` varchar(255) DEFAULT NULL,`arr_time` varchar(255) DEFAULT NULL,`code` varchar(255) DEFAULT NULL,"\
    "`dep_date` varchar(255) DEFAULT NULL,`dep_time` varchar(255) DEFAULT NULL,`flight_time` varchar(255) DEFAULT NULL,`wait_time` varchar(255) DEFAULT NULL,`ticket_id` bigint DEFAULT NULL,"\
    "`arr_code` varchar(255) DEFAULT NULL,`arr_name` varchar(255) DEFAULT NULL,`dep_code` varchar(255) DEFAULT NULL,`dep_name` varchar(255) DEFAULT NULL,`plus_date` int NOT NULL,"\
    "`waypoint_name` varchar(255) DEFAULT NULL,`codeshare_name` varchar(255) DEFAULT NULL,PRIMARY KEY (`flight_id`),KEY `FKh0125h9ffnajtidrdls1ceom4` (`ticket_id`),"\
    "CONSTRAINT `FKh0125h9ffnajtidrdls1ceom4` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

create_round_sql = "CREATE TABLE `round_ticket_like` (`round_ticket_like_id` bigint NOT NULL AUTO_INCREMENT,`is_change` bit(1) DEFAULT NULL,`is_delete` bit(1) DEFAULT NULL,`wanted_price` int DEFAULT NULL,"\
    "`member_id` bigint DEFAULT NULL,`ticket_from_ticket_id` bigint DEFAULT NULL,`ticket_to_ticket_id` bigint DEFAULT NULL,PRIMARY KEY (`round_ticket_like_id`),KEY `FKacg1orbbamcu60yl51ime6pl4` (`member_id`),"\
    "KEY `FKfuuqdjdn4it9hrdfkiwwkin4l` (`ticket_from_ticket_id`),KEY `FK6ry3thhiloq1coo1tbj1sfeyn` (`ticket_to_ticket_id`),CONSTRAINT `FK6ry3thhiloq1coo1tbj1sfeyn` FOREIGN KEY (`ticket_to_ticket_id`) "\
    "REFERENCES `ticket` (`ticket_id`),CONSTRAINT `FKacg1orbbamcu60yl51ime6pl4` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),CONSTRAINT `FKfuuqdjdn4it9hrdfkiwwkin4l` FOREIGN KEY (`ticket_from_ticket_id`) "\
    "REFERENCES `ticket` (`ticket_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

create_oneway_sql = "CREATE TABLE `oneway_ticket_like` (`oneway_ticket_like_id` bigint NOT NULL AUTO_INCREMENT,`is_change` bit(1) DEFAULT NULL,`is_delete` bit(1) DEFAULT NULL,`ticket_id` bigint DEFAULT NULL,"\
    "`wanted_price` int DEFAULT NULL,`member_id` bigint DEFAULT NULL,PRIMARY KEY (`oneway_ticket_like_id`),KEY `FKahullb8ges5ufn6crpo8fjodl` (`member_id`),KEY `FKc0cukid5cxhgcxh9yjw98l0pg` (`ticket_id`),"\
    "CONSTRAINT `FKahullb8ges5ufn6crpo8fjodl` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),CONSTRAINT `FKc0cukid5cxhgcxh9yjw98l0pg` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)) "\
    "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

create_tendency_sql = "CREATE TABLE `tendency` (`ticket_id` bigint DEFAULT NULL,`average` double DEFAULT NULL,`chg` double DEFAULT NULL,`updown` int DEFAULT NULL,`past_prices` text,`tendency_id` bigint NOT NULL AUTO_INCREMENT,"\
    "PRIMARY KEY (`tendency_id`),KEY `tt_idx` (`ticket_id`),CONSTRAINT `tt` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

with engine.begin() as conn:
    conn.execute(text(drop_tendency_sql))
    conn.execute(text(drop_oneway_sql))
    conn.execute(text(drop_round_sql))
    conn.execute(text(drop_flight_sql))
    conn.execute(text(drop_ticket_sql))
    
    conn.execute(text(create_ticket_sql))
    conn.execute(text(create_flight_sql))
    conn.execute(text(create_round_sql))
    conn.execute(text(create_oneway_sql))
    conn.execute(text(create_tendency_sql))


######################################### file을 읽어서  #########################################
####################################### ticket flight insert #######################################


schema = StructType([
    StructField("key", StringType(), True),
    StructField("value", StringType(), True)
    ])
# load data
# hadoopDF : key = String, value = price
#lines = spark.read.option("sep", "\t").schema(schema).csv("hdfs://localhost:9000/user/output/2023-03-29")
lines = spark.read.option("sep", "\t").schema(schema).csv("file:/home/j8b307/pjt_spark/2023-04-01-2")
lines = lines.distinct()
# ticket과 flight 정보가 들어있는 key 컬럼을 ', '를 기준으로 split     
lines = lines.withColumn("info", func.split(func.col("key"), ", "))
lines = lines.withColumn("temp", func.split(func.col("value"), "원").getItem(0))
lines = lines.withColumn("price", func.col("temp").cast("int"))
#lines.show()


tckDF = lines.select(lines["info"].getItem(0).cast("string").alias("dep_date"), lines["info"].getItem(1).alias("airline"), lines["info"].getItem(2).alias("codeshare"), lines["info"].getItem(3).alias("dep_code"),\
                        lines["info"].getItem(4).alias("dep_time"), lines["info"].getItem(5).alias("total_time"), lines["info"].getItem(6).alias("arr_code"), \
                        lines["info"].getItem(7).alias("arr_time"), lines["info"].getItem(8).alias("plus_date"), lines["info"].getItem(9).alias("waypoint_num"), lines["price"].alias("price"))

today_date = parse("2023-04-01").date()

# plus_date와 waypoint_num을 연산을 위해 int 형으로 형변환
tckDF = tckDF.withColumn("plus_date", func.col("plus_date").cast("int"))
tckDF = tckDF.withColumn("waypoint_num", func.when(func.col("waypoint_num") == func.lit("직항"), 0)
        .otherwise(func.split(func.col("waypoint_num"), "경유").getItem(1)))
tckDF = tckDF.withColumn("total_time_hour", func.split(func.col("total_time"), "시간").getItem(0))
tckDF = tckDF.withColumn("total_time_hour", func.col("total_time_hour").cast("int"))
tckDF = tckDF.withColumn("total_time_minute", func.split(func.split(func.col("total_time"), "시간").getItem(1), "분").getItem(0))
tckDF = tckDF.withColumn("total_time_minute", func.col("total_time_minute").cast("int"))
tckDF = tckDF.withColumn("total_time_num", func.col("total_time_hour") * 60 + func.col("total_time_minute"))
tckDF = tckDF.withColumn("regist_date", func.lit(str(today_date)))
tckDF = tckDF.withColumn("codeshare", func.when(func.col("codeshare") == "True", func.lit(1)).otherwise(func.lit(0)))
tckDF = tckDF.withColumn("index", func.monotonically_increasing_id())
tckDF = tckDF.select("index", "regist_date", "dep_date", "airline", "codeshare", "dep_code", "dep_time", "total_time", "total_time_num", "arr_code", "arr_time", "plus_date", "waypoint_num", "price")


#tckDF.show()


index_col = tckDF.select(func.col("index"))
fht_col_name = ["wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code"]
n = 0
fhtDF1 = lines.select(lines["info"].getItem(n*14 +10).cast("string").alias("col_0"), lines["info"].getItem(n*14 +11).alias("col_1"), lines["info"].getItem(n*14 +12).alias("col_2"), lines["info"].getItem(n*14 +13).alias("col_3"), lines["info"].getItem(n*14 +14).alias("col_4"),\
                      lines["info"].getItem(n*14 +15).cast("string").alias("col_5"), lines["info"].getItem(n*14 +16).alias("col_6"), lines["info"].getItem(n*14 +17).alias("col_7"), lines["info"].getItem(n*14 +18).alias("col_8"), lines["info"].getItem(n*14 +19).alias("col_9"),\
                      lines["info"].getItem(n*14 +20).cast("string").alias("col_10"), lines["info"].getItem(n*14 +21).alias("col_11"), lines["info"].getItem(n*14 +22).alias("col_12"), lines["info"].getItem(n*14 +23).alias("col_13"),
                      )
fhtDF1 = fhtDF1.withColumn("index", func.monotonically_increasing_id())


n = 1
fhtDF2 = lines.select(lines["info"].getItem(n*14 +10).cast("string").alias("col_0"), lines["info"].getItem(n*14 +11).alias("col_1"), lines["info"].getItem(n*14 +12).alias("col_2"), lines["info"].getItem(n*14 +13).alias("col_3"), lines["info"].getItem(n*14 +14).alias("col_4"),\
                      lines["info"].getItem(n*14 +15).cast("string").alias("col_5"), lines["info"].getItem(n*14 +16).alias("col_6"), lines["info"].getItem(n*14 +17).alias("col_7"), lines["info"].getItem(n*14 +18).alias("col_8"), lines["info"].getItem(n*14 +19).alias("col_9"),\
                      lines["info"].getItem(n*14 +20).cast("string").alias("col_10"), lines["info"].getItem(n*14 +21).alias("col_11"), lines["info"].getItem(n*14 +22).alias("col_12"), lines["info"].getItem(n*14 +23).alias("col_13"),
                      )
fhtDF2 = fhtDF2.withColumn("index", func.monotonically_increasing_id())


n = 2
fhtDF3 = lines.select(lines["info"].getItem(n*14 +10).cast("string").alias("col_0"), lines["info"].getItem(n*14 +11).alias("col_1"), lines["info"].getItem(n*14 +12).alias("col_2"), lines["info"].getItem(n*14 +13).alias("col_3"), lines["info"].getItem(n*14 +14).alias("col_4"),\
                      lines["info"].getItem(n*14 +15).cast("string").alias("col_5"), lines["info"].getItem(n*14 +16).alias("col_6"), lines["info"].getItem(n*14 +17).alias("col_7"), lines["info"].getItem(n*14 +18).alias("col_8"), lines["info"].getItem(n*14 +19).alias("col_9"),\
                      lines["info"].getItem(n*14 +20).cast("string").alias("col_10"), lines["info"].getItem(n*14 +21).alias("col_11"), lines["info"].getItem(n*14 +22).alias("col_12"), lines["info"].getItem(n*14 +23).alias("col_13"),
                      )
fhtDF3 = fhtDF3.withColumn("index", func.monotonically_increasing_id())


n = 3
fhtDF4 = lines.select(lines["info"].getItem(n*14 +10).cast("string").alias("col_0"), lines["info"].getItem(n*14 +11).alias("col_1"), lines["info"].getItem(n*14 +12).alias("col_2"), lines["info"].getItem(n*14 +13).alias("col_3"), lines["info"].getItem(n*14 +14).alias("col_4"),\
                      lines["info"].getItem(n*14 +15).cast("string").alias("col_5"), lines["info"].getItem(n*14 +16).alias("col_6"), lines["info"].getItem(n*14 +17).alias("col_7"), lines["info"].getItem(n*14 +18).alias("col_8"), lines["info"].getItem(n*14 +19).alias("col_9"),\
                      lines["info"].getItem(n*14 +20).cast("string").alias("col_10"), lines["info"].getItem(n*14 +21).alias("col_11"), lines["info"].getItem(n*14 +22).alias("col_12"), lines["info"].getItem(n*14 +23).alias("col_13"),
                      )
fhtDF4 = fhtDF4.withColumn("index", func.monotonically_increasing_id())


for fcname in range(len(fht_col_name)):
    fhtDF1 = fhtDF1.withColumn(fht_col_name[fcname], func.col(f'col_{fcname}'))
    fhtDF2 = fhtDF2.withColumn(fht_col_name[fcname], func.col(f'col_{fcname}'))
    fhtDF3 = fhtDF3.withColumn(fht_col_name[fcname], func.col(f'col_{fcname}'))
    fhtDF4 = fhtDF4.withColumn(fht_col_name[fcname], func.col(f'col_{fcname}'))
fhtDF1 = fhtDF1.select("index", "wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code") 
fhtDF2 = fhtDF2.select("index", "wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code") 
fhtDF3 = fhtDF3.select("index", "wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code") 
fhtDF4 = fhtDF4.select("index", "wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code") 

#fhtDF1.show()
#fhtDF2.show()
#fhtDF3.show()
#fhtDF4.show()


print("!!!!!!!!!!!!!!!!!!!!!!!!!", fhtDF1.count(), fhtDF2.count(), fhtDF3.count(), fhtDF4.count())

tckDF = tckDF.join(fhtDF1.select("dep_name", "index", "arr_name", "arr_date"), "index", "inner")

fhtDF2_temp = fhtDF2.select(func.col("index"), func.col("arr_name").alias("arr_name_temp"), func.col("arr_date").alias("arr_date_temp"))

tckDF = tckDF.join(fhtDF2_temp, "index", "inner")
tckDF = tckDF.withColumn("arr_name", 
                         func.when(func.col("arr_name_temp").isNull(), func.col("arr_name"))
                             .otherwise(func.col("arr_name_temp")))
tckDF = tckDF.withColumn("arr_date", 
                         func.when(func.col("arr_date_temp").isNull(), func.col("arr_date"))
                             .otherwise(func.col("arr_date_temp")))

#tckDF.show()
tckDF = tckDF.select("index", "regist_date", "dep_date", "airline", "codeshare", "dep_code", "dep_time", "total_time", "total_time_num", "arr_code", "arr_time", "plus_date", "waypoint_num", "price", "dep_name", "arr_name", "arr_date")


fhtDF3_temp = fhtDF3.select(func.col("index"), func.col("arr_name").alias("arr_name_temp"), func.col("arr_date").alias("arr_date_temp"))

tckDF = tckDF.join(fhtDF3_temp, "index", "inner")
tckDF = tckDF.withColumn("arr_name", 
                         func.when(func.col("arr_name_temp").isNull(), func.col("arr_name"))
                             .otherwise(func.col("arr_name_temp")))
tckDF = tckDF.withColumn("arr_date", 
                         func.when(func.col("arr_date_temp").isNull(), func.col("arr_date"))
                             .otherwise(func.col("arr_date_temp")))

#tckDF.show()
tckDF = tckDF.select("index", "regist_date", "dep_date", "airline", "codeshare", "dep_code", "dep_time", "total_time", "total_time_num", "arr_code", "arr_time", "plus_date", "waypoint_num", "price", "dep_name", "arr_name", "arr_date")


fhtDF4_temp = fhtDF4.select(func.col("index"), func.col("arr_name").alias("arr_name_temp"), func.col("arr_date").alias("arr_date_temp"))

tckDF = tckDF.join(fhtDF4_temp, "index", "inner")
tckDF = tckDF.withColumn("arr_name", 
                         func.when(func.col("arr_name_temp").isNull(), func.col("arr_name"))
                             .otherwise(func.col("arr_name_temp")))
tckDF = tckDF.withColumn("arr_date", 
                         func.when(func.col("arr_date_temp").isNull(), func.col("arr_date"))
                             .otherwise(func.col("arr_date_temp")))

#tckDF.show()
tckDF = tckDF.select("index", "regist_date", "dep_date", "airline", "codeshare", "dep_code", "dep_time", "total_time", "total_time_num", "arr_code", "arr_time", "plus_date", "waypoint_num", "price", "dep_name", "arr_name", "arr_date")


#tckDF.show()

tckPD = tckDF.toPandas()

with tqdm(total = len(tckPD.index), desc = "ticket insert") as pbar:
    tckPD.to_sql(name="ticket", con=engine, if_exists="append", index=False)
    pbar.update(len(tckPD.index))

with engine.begin() as conn:
    tckDBPD = pd.read_sql_table(table_name = "ticket", con=conn)

tckDB = spark.createDataFrame(tckDBPD)
tckDB = tckDB.select("ticket_id", "index")
#tckDB.show()

fhtDF1 = fhtDF1.filter(func.col("wait_time").isNotNull())
fhtDF2 = fhtDF2.filter(func.col("wait_time").isNotNull())
fhtDF3 = fhtDF3.filter(func.col("wait_time").isNotNull())
fhtDF4 = fhtDF4.filter(func.col("wait_time").isNotNull())

fhtDF1 = fhtDF1.join(tckDB, "index", "inner").select("wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code", "ticket_id")
fhtDF2 = fhtDF2.join(tckDB, "index", "inner").select("wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code", "ticket_id")
fhtDF3 = fhtDF3.join(tckDB, "index", "inner").select("wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code", "ticket_id")
fhtDF4 = fhtDF4.join(tckDB, "index", "inner").select("wait_time", "dep_time", "dep_date", "dep_name", "dep_code", "flight_time", "code", "codeshare_name", "waypoint_name", "arr_time", "plus_date", "arr_date", "arr_name", "arr_code", "ticket_id")
print("!!!!!!!!!!!!!!!!!!!!!!!!!", fhtDF1.count(), fhtDF2.count(), fhtDF3.count(), fhtDF4.count())

fhtDF = fhtDF1.union(fhtDF2)
fhtDF = fhtDF.union(fhtDF3)
fhtDF = fhtDF.union(fhtDF4)
#fhtDF.show(fhtDF.count())

print("!!!!!!!!!!!!!!!!!!!join after ", fhtDF.count())

#fhtDF.show(fhtDF.count())

fhtPD = fhtDF.toPandas()
with tqdm(total=len(fhtPD.index), desc = "flight insert") as pbar:
    fhtPD.to_sql(name="flight", con=engine, if_exists="append", index=False)
    pbar.update(len(fhtPD.index))


####################################### ticket 읽어서  #######################################
####################################### 찜 테이블 insert #######################################

with engine.begin() as conn:
    tckDBPD = pd.read_sql_table(table_name = "ticket", con=conn)
tckDF = spark.createDataFrame(tckDBPD)

join_col = ["airline", "arr_date", "arr_time", "dep_date", "dep_time", "plus_date", "total_time", "total_time_num", "waypoint_num", "arr_code", "arr_name", "dep_code", "dep_name", "codeshare", "regist_date"]

if onewayDF != None:
    onewayDF = onewayDF.join(tckDF, join_col, "inner")
    onewayDF = onewayDF.withColumn("is_change", func.when(func.col("price") <= func.col("wanted_price"), func.lit(1)).otherwise(func.lit(0)))
    onewayDF = onewayDF.select("ticket_id", "is_change", "is_delete", "wanted_price", "member_id")
    onewayPD = onewayDF.toPandas()

    with tqdm(total=len(onewayPD.index), desc = "oneway insert") as pbar:
        onewayPD.to_sql(name="oneway_ticket_like", con=engine, if_exists="append", index=False)
        pbar.update(len(onewayPD.index))

#onewayDF.show()

if roundDF != None:
    roundDF1 = roundDF1.join(tckDF, join_col, "inner")
    roundDF1 = roundDF1.withColumn("ticket_to_ticket_id", func.col("ticket_id"))
    roundDF1 = roundDF1.select("round_ticket_like_id", "is_change", "is_delete", "wanted_price", "member_id", "ticket_to_ticket_id", "price")


    roundDF2 = roundDF2.join(tckDF, join_col, "inner")
    roundDF2 = roundDF2.withColumn("ticket_from_ticket_id", func.col("ticket_id"))
    roundDF2 = roundDF2.select("round_ticket_like_id", "is_change", "is_delete", "wanted_price", "member_id", "ticket_from_ticket_id")


    round_join_col = ["round_ticket_like_id", "is_change", "is_delete", "wanted_price", "member_id"]
    roundDF = roundDF1.join(roundDF2, round_join_col, "inner")
    roundDF = roundDF.withColumn("is_change", func.when(func.col("price") <= func.col("wanted_price"), func.lit(1)).otherwise(func.lit(0)))
    roundDF = roundDF.drop("round_ticket_like_id").drop("price")

    #roundDF.show()
    roundPD = roundDF.toPandas()
    with tqdm(total=len(roundPD.index), desc = "round insert") as pbar:
        roundPD.to_sql(name="round_ticket_like", con=engine, if_exists="append", index=False)
        pbar.update(len(roundPD.index))    



spark.stop()

