from pyspark import SparkConf, SparkContext

conf = SparkConf().setMaster("local").setAppName("MinTemperatures")
sc = SparkContext(conf = conf)

def parseLine(line):
    fields = line.split(',')
    stationID = fields[0]  # 기상 관측소 ID
    entryType = fields[2]  # 기온 유형
		# 10배로 나오던 것을 원래대로 만들고, 섭씨에서 화씨로 바꾸는 수식 적용
    temperature = float(fields[3]) * 0.1 * (9.0 / 5.0) + 32.0  # 기온
    return (stationID, entryType, temperature)

lines = sc.textFile("file:///SparkCourse/1800.csv")
parsedLines = lines.map(parseLine)

# field 1이 TMIN이면 넣는다. 즉, 기온 유형이 TMIN이면 넣는다.
minTemps = parsedLines.filter(lambda x: "TMIN" in x[1])
# stationTemps :  기온 유형은 TMIN 밖에 없으니까 필요 없음. 기온 유형을 뺀 RDD를 새로 만듦
# key는 stationID, value는 temperature
stationTemps = minTemps.map(lambda x: (x[0], x[2]))
# minTemps : key는 기상관측소 ID, value는 1800년도의 최저 기온
minTemps = stationTemps.reduceByKey(lambda x, y: min(x,y))
results = minTemps.collect();

for result in results:
# 소수점 2자리까지 출력
    print(result[0] + "\t{:.2f}F".format(result[1]))

