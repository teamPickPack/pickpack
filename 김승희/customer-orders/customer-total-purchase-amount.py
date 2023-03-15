from pyspark import SparkConf, SparkContext

conf = SparkConf().setMaster("local").setAppName("CustomerTotalPurchaseAmount")
sc = SparkContext(conf = conf)

def parseLine(line):
    fields = line.split(",")
    return (int(fields[0]), float(fields[2]))

input = sc.textFile("file:///SparkCourse/customer-orders.csv")

customers = input.map(parseLine)
customersAcc = customers.reduceByKey(lambda x, y : x+y)
sortAcc = customersAcc.sortByKey()  # 고객 ID를 기준으로 정렬
results = sortAcc.collect()     

reverseCustomersAcc = customersAcc.map(lambda x : (x[1], x[0]))
sortAcc2 = reverseCustomersAcc.sortByKey()  # 총 구매가를 기준으로 정렬
results2 = sortAcc2.collect()


for result in results2:
    print(result[0], result[1])
