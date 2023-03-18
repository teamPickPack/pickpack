from pyspark.sql import SparkSession
from pyspark.sql import functions as func
from pyspark.sql.types import StructType, StructField, IntegerType

spark = SparkSession.builder.appName("PopularMovie SH").getOrCreate()

movieSchema = StructType([
    StructField("userId", IntegerType(), True),
    StructField("movieId", IntegerType(), True),
    StructField("rate", IntegerType(), True),
    StructField("timeStamp", IntegerType(), True)
])

movieDF = spark.read.option("sep", "\t").schema(movieSchema).csv("file:///SparkCourse/ml-100k/u.data")
PopularMovie = movieDF.groupBy("movieId").count().orderBy(func.desc("count"))
PopularMovie.show()

spark.stop()