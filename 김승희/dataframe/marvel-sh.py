from pyspark.sql import SparkSession
from pyspark.sql import functions as func
from pyspark.sql.types import StructType, StructField, IntegerType, StringType

spark = SparkSession.builder.appName("Hero").getOrCreate()

connectInput = spark.read.text("file:///SparkCourse/Marvel-graph.txt")
connections = connectInput.withColumn("id", func.split(func.col("value"), " ")[0]) \
                    .withColumn("connections", func.size(func.split(func.col("value"), " "))-1)\
                    .groupBy("id").agg(func.sum("connections").alias("connections"))

schema = StructType([
    StructField("id", IntegerType(), True),
    StructField("name", StringType(), True)
])

minN = connections.agg(func.min("connections")).first()[0]
anonymity = connections.filter(func.col("connections") == minN)

heroNames = spark.read.schema(schema).option("sep", " ").csv("file:///SparkCourse/Marvel-names.txt")
anonymityName = anonymity.join(heroNames, "id")


print("-"*60)
print("the following characters have only " + str(minN) + " connection(s) : ")
anonymityName.select("name").show()
spark.stop()