import pymysql
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, BooleanType, DateType, IntegerType, LongType, StringType
from pyspark.sql import functions as func
from sqlalchemy import create_engine, text, MetaData, Table, Column, Integer, String, BigInteger, Boolean

db = pymysql.connect(host="j8b307.p.ssafy.io", port=3306, user="root", password="ssafy", db="test")
cursor = db.cursor()
engine = create_engine("mysql+pymysql://root:ssafy@j8b307.p.ssafy.io:3306/test?charset=utf8")
conn = engine.connect()

# SparkSession 생성
spark = SparkSession.builder.appName("PriceChange").getOrCreate()

# ticket table SELECT
cursor.execute("SELECT ticket_id, price FROM ticket")

# 결과를 Python list로 변환
rows = cursor.fetchall()

db_schema = StructType([
    StructField("ticket_id", IntegerType(), True),   # 0
    StructField("price", IntegerType(), True),       # 1
])

# Spark 데이터프레임으로 변환
tckDF = spark.createDataFrame(rows, schema=db_schema)

#tckDF.show()


# 편도 항공권 찜 목록 is_change update
cursor.execute("SELECT * FROM oneway_ticket_like")
rows = cursor.fetchall()

# oneway_ticket_like schema
oneway_schema = StructType([
    StructField("oneway_ticket_like_id", IntegerType(), True),
    StructField("is_change", IntegerType(), True),
    StructField("is_delete", IntegerType(), True),
    StructField("ticket_id", IntegerType(), True),
    StructField("wanted_price", IntegerType(), True),
    StructField("member_id", IntegerType(), True),
])


data_with_string = []
for row in rows:
    change_int = int.from_bytes(row[1], "big") 
    change_str = 'True' if change_int==1 else 'False'
    delete_int = int.from_bytes(row[2], "big") 
    delete_str = 'True' if change_int==1 else 'False'
    data_with_string.append((row[0], change_int, delete_int, row[3], row[4], row[5]))

onewayDF = spark.createDataFrame(data_with_string, schema=oneway_schema)

# ticket table이랑 oneway_ticket_like table이랑 ticket_id로 inner join
oneway_join = onewayDF.join(tckDF, "ticket_id", "inner")

# ticket table의 pricke와 oneway_ticket_like table의 wanted_price를 비교해서 wanted_price <= price면 0 아니면 1
oneway_join = oneway_join.withColumn("is_change", func.when(func.col("wanted_price") <= func.col("price"), 0).otherwise(1))

# 필요한 컬럼만 select
oneway_join = oneway_join.select("oneway_ticket_like_id", "is_change", "is_delete", "ticket_id", "wanted_price", "member_id")
oneway_join.show()

# pandas dataframe으로 변경
oneway_join_pd = oneway_join.toPandas()

# is_change 값이 1이면 update
for ojp in range(len(oneway_join_pd)):
    if oneway_join_pd['is_change'][ojp] == 1:
        ojp_id = oneway_join_pd["oneway_ticket_like_id"][ojp]
        ojp_change = oneway_join_pd["is_change"][ojp]
        update_sql = 'update oneway_ticket_like set is_change = ' + str(ojp_change) + ' where oneway_ticket_like_id = ' + str(ojp_id)
        cursor.execute(update_sql)
db.commit()

# 왕복 항공권 찜 목록 is_change update
cursor.execute("SELECT * FROM round_ticket_like")
rows = cursor.fetchall()

# round_ticket_like table schema
round_schema = StructType([
    StructField("round_ticket_like_id", IntegerType(), True),
    StructField("is_change", IntegerType(), True),
    StructField("is_delete", IntegerType(), True),
    StructField("wanted_price", IntegerType(), True),
    StructField("member_id", IntegerType(), True),
    StructField("ticket_from_ticket_id", IntegerType(), True),
    StructField("ticket_to_ticket_id", IntegerType(), True),
])


data_with_string = []
for row in rows:
    change_int = int.from_bytes(row[1], "big") 
    change_str = 'True' if change_int==1 else 'False'
    delete_int = int.from_bytes(row[2], "big") 
    delete_str = 'True' if change_int==1 else 'False'
    data_with_string.append((row[0], change_int, delete_int, row[3], row[4], row[5], row[6]))

roundDF = spark.createDataFrame(data_with_string, schema=round_schema)
roundDF.show()

# round_ticket_like의 ticket_from_ticket_id를 ticket_id로 바꾸기
roundDF = roundDF.withColumn("ticket_id", func.col("ticket_from_ticket_id"))

# 필요한 컬럼만 선택
roundDF = roundDF.select("ticket_id", "is_change", "ticket_to_ticket_id", "wanted_price", "round_ticket_like_id")

# ticket table의 ticket_id와 round_ticket_like의 ticket_from_ticket_id로 inner join
round_join = roundDF.join(tckDF, "ticket_id", "inner")

# price값을 from_price로 변경
round_join = round_join.withColumn("from_price", func.col("price"))

# round_ticket_like의 ticket_to_ticket_id를 ticket_id로 바꾸기
round_join = round_join.withColumn("ticket_id", func.col("ticket_to_ticket_id"))

# 필요한 컬럼만 선택
round_join = round_join.select("is_change", "ticket_id", "wanted_price", "round_ticket_like_id", "from_price")

# ticket table의 ticket_id와 round_ticket_like의 ticket_to_ticket_id로 inner join
round_join = round_join.join(tckDF, "ticket_id", "inner")

# total_price에 rount_ticket_like의 to ticket과 from ticket의 총 가격을 구함 
round_join = round_join.withColumn("total_price", func.col("from_price") + func.col("price"))

# 필요한 컬럼만 선택
round_join = round_join.select("is_change", "wanted_price", "round_ticket_like_id", "total_price")

# total_price와 oneway_ticket_like table의 wanted_price를 비교해서 wanted_price <= total_price면 0 아니면 1
round_join = round_join.withColumn("is_change", func.when(func.col("wanted_price") <= func.col("total_price"), 0).otherwise(1))
round_join = round_join.select("round_ticket_like_id", "is_change", "wanted_price")
round_join.show()

# pandas dataframe으로 변경
round_join_pd = round_join.toPandas()

# is_change 값이 1이면 update
for ojp in range(len(round_join_pd)):
    if round_join_pd['is_change'][ojp] == 1:
        ojp_id = round_join_pd["round_ticket_like_id"][ojp]
        ojp_change = round_join_pd["is_change"][ojp]
        update_sql = 'update round_ticket_like set is_change = ' + str(ojp_change) + ' where round_ticket_like_id = ' + str(ojp_id)
        cursor.execute(update_sql)
db.commit()
