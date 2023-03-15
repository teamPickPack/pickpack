# Spark SQL

## DataFrame

- RDD를 DataFrame으로 확장할 수 있다.
- Contains Row objects
- Can run SQL queries
- Can have a schema (leading to more efficient storage)
- read and write to JSON, Hive, parquet, csv …
- Communicates with JDBC/ODBC, Tableau
    - 스파크 외부와 소통 가능
- 클러스터 전체를 거쳐 DataFrame에 적용할 수 있다.
- RDD는 적게 DataFrame을 많이 사용하는 게 요즘 트렌드
- 기계학습 라이브러리와 스파크 스트리밍 라이브러리가 DataFrame 사용하는 쪽으로!
- 다른 구성요소들 사이에서 정보를 보내는 구조


## DataSet

- DataFrame is really a DataSet of Row Objects
    - 데이터 프레임은 행 객체로 이루어진 데이터 세트 객체
- DataSet은 구조화되지 않은 행뿐만 아니라 구조화된 행도 포함 가능
- 파이썬은 Type이 정해져있지 않기 때문에  python이면 볼 일 별로 없음
- Scala에서 많이 보임
    - 스칼라에서 DataSet을 사용하면 type이 정해진다.
        
        → 더 효율적으로 저장됨
        
        → compile 동안 error를 잡을 수 있음 + 최적화할 수 있음
        

### spark-sql.py

```python
from pyspark.sql import SparkSession
from pyspark.sql import Row

# Create a SparkSession
spark = SparkSession.builder.appName("SparkSQL").getOrCreate()

# 구조화된 행으로 바꾸기 위함. DataFrame에 넣기 위해 행으로 구성된 RDD 생성
def mapper(line):
    fields = line.split(',')
		# 이름과 데이터 형식 부여
    return Row(ID=int(fields[0]), name=str(fields[1].encode("utf-8")), age=int(fields[2]), numFriends=int(fields[3]))
# -> 명확하게 구성되고 이름이 붙여진 field로 구성된 행 객체로 이루어진 RDD.
# -> DataFrame의 열과 상응됨

# fakefriends.csv 파일에는 header 행이 없음!
lines = spark.sparkContext.textFile("fakefriends.csv")  # 이건 RDD
people = lines.map(mapper)

schemaPeople = spark.createDataFrame(people).cache()  
# -> RDD를 DataFrame으로 변환. 
# -> 이 DataFrame으로 다른 많은 쿼리를 실행할 것이기 때문에 cache(). (memory에 넣어둔다)

# DB Table로 쿼리를 하기 위해 임시 뷰 생성
schemaPeople.createOrReplaceTempView("people")

teenagers = spark.sql("SELECT * FROM people WHERE age >= 13 AND age <= 19")
# -> SQL 명령어에 사용된 이름은 위에서 부여한 이름과 일치해야 한다.

for teen in teenagers.collect():
  print(teen)

schemaPeople.groupBy("age").count().orderBy("age").show()
# -> 각 나이별로 몇 명이 있는지를 age로 정렬한 결과를 보여준다. default인 20개 행을 보여줌
# -> mySQL의 count나 orderBy와 같은 기능

# close session
spark.stop()
```
