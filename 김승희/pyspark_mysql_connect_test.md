## spark mysql connect
1. mysql java connector 다운로드
    
    [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)
    
    Platform independent로 다운받음
    

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd355d65-3c89-4cda-bb71-21934e3e4129/Untitled.png)

1. mysql-connector-j-8.0.32.jar를 spark가 있는 폴더의 jars 폴더에 넣기
    1. 나는 C:/spark/jars
2. 아래와 같이 코드 작성
    
    ```
    from pyspark.sql import SparkSession
    import os
    spark = SparkSession.builder.master('local').appName("mySQL Test")\
                    .config("spark.driver.extraClassPath", "file://spark/jars/mysql-connector-j-8.0.32.jar")\
                    .getOrCreate()
    
    # spark.conf.set("spark.driver.extraClassPath", "/spark/jars/mysql-connector-j-8.0.32.jar")
    
    jdbc = spark.read.format("jdbc")\
            .option("url", "jdbc:mysql://localhost:3306/world?useUniCode=yes&characterEncoding=UTF-8&serverTimezone=Asia/Seoul")\
            .option("driver", "com.mysql.jdbc.Driver")\
            .option("user", "root")\
            .option("password", "ssafy")\
            .option("dbtable", "city").load()
    jdbc.show()
    ```
    
    <aside>
    💡 java.lang.ClassNotFoundException: com.mysql.jdbc.Driver 에러
    jar 파일을 제대로 인식하지 못해서 생기는 문제. 
    .config("spark.driver.extraClassPath", "/spark/jars/mysql-connector-j-8.0.32.jar")
    .config("spark.driver.extraClassPath", "C://spark/jars/mysql-connector-j-8.0.32.jar")
    → 2개는 안됨
    
    </aside>