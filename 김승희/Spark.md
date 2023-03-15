# Spark

- A fast and general engine for large-scale data processing
- 빅 데이터 처리를 위한 빠르고 일반적인 엔진
- 웹 로그나 유전체 정보 같이 엄청나게 큰 데이터 세트를 가지고 있다면 스파크가 데이터를 분할하고 컴퓨터의 거대한 클러스터 사이로 프로세싱을 분배한다.
- 하나의 machine에서 다루기 너무 큰 데이터를 쪼개서 여러 개의 machine으로 나눔
- 스파크는 하둡 클러스터로 작업을 분배한다.
- 클러스터 매니저는 작업을 분할하고 다른 다양한 executor 사이에서 조정한다.
    - 하둡의 클러스터 매니저는 yarn
- 스파크는 machine 마다 다수의 executor를 분할하고 만들어냄
- 하나의 executor가 고장 나도 회복 가능
- 컴퓨터 전체 클러스터의 규모를 측정해 수평 분할 (수평적인 확장성)

### MapReduce 대신 스파크를 사용하는 이유

- 스파크가 빠르기 때문
- DAG(Directed Acyclic Graph) optimizes workflows
- 스파크의 좋은 점은 결과를 전송하라고 하기 전 까지는 아무것도 하지 않음
    - 원하는 결과를 얻기 위해 취합할 필요가 있는 모든 단계의 그래프를 만듬
    - 그래서 사용자의 질문에 더 빠르게 답을 찾아줌

## Components of Spark

- 모두 Spark Core 위에서 동작함
    1. Spark Streaming
        1. 실시간 데이터 스트림(계속해서 업데이트 되는 웹 로그 셋)을 분석할 수 있게 함
    2. Spark SQL
        1. 스파크에서 구조화된 데이터를 처리
    3. MLLib
        1. 머신러닝 알고리즘 라이브러리
        2. 스파크를 이용한 데이터 수집에 유용한 도구가 많음
        3. 여러 common operation을 단순화하는데 사용 가능
    4. GraphX
        1. 네트워크를 정리하고 해당 그래프들의 특성에 대한 정보를 줄 수 있음
    5. Spark CORE

## RDD

- Resilient Distributed Dataset
- 복구 가능한 분산 데이터 세트
- 빅데이터 세트
- 한 데이터를 다른 데이터로 변환하는데 사용
- 데이터에 액션을 수행해 원하는 값을 얻을 수 있음
- Spark의 핵심 객체
- 모두 RDD를 중심으로 돌아간다.
- 다양한 데이터 세트를 추상화한 것
- **분산되고 변형되는 성질**이 있어서 여러 클러스터로 나눌 수 있고 개인 컴퓨터에서 작동도 가능
- 클러스터의 특정 노드에 이상이 생겨도 자동으로 처리해주고 노드 하나가 작동을 멈춰도 계속 작동하면서 작업을 재분배 (물론 우리가 하는 게 아니라 스파크나 클러스터 매니저가 대신 해줌)

RDD 객체를 만들어서 어떤 데이터 세트에 로드한 다음, 데이터 처리 과정을 분산하기 위해 RDD에 다양한 방법을 적용

## SparkContext

- SparkContext로 RDD를 만들 수 있다.
- 코딩의 시작점
- RDD 생성에 필요한 다양한 방법을 제공
    - ex) sc.paralleize() → RDD 생성에 사용할 고정 데이터를 불러올 수 있음
    - 실전에서 잘 안 씀, 데이터가 고정되어 있다는 것은 데이터가 크지 않다는 의미니까
- RDD 생성에 자주 쓰이는 함수
    - sc.textFile() → 하드 드라이브에 있는 파일을 불러와서 RDD로 만들어 데이터 처리 가능
    - 물론 내 컴퓨터에 있을 정도면 그렇게 큰 데이터는 아니겠지만 s3나 hdfs url로도 textFile을 할 수 있음
    - s3랑 hdfs가 분산 파일 시스템이라고 할 수 있고 url로 쉽게 사용 가능
- RDD는 hive로도 만들 수 있다. hive context를 통해서. 하이브 저장소와 연결되어 있을 때
    - hive : hadoop을 기반으로 운영됨.
- json 파일, csv 파일, sequence 파일, object 파일, compressed 파일도 로드 가능

## Transforming RDD

- 함수로 하나의 RDD를 다른 RDD로 변형한다.
- 기존 RDD의 entry를 여러 개로 부풀리거나 없애버릴 수 있다.
- RDD에 쓸 수 있는 기본적인 연산
1. map
    - 데이터를 불러와서 다른 데이터로 변형하는 함수
        
        Map은 RDD의 각 원소와 일대일 대응이기 때문에 기존 RDD의 모든 entry가 새 RDD의 새로운 값으로 변형된다.
        
        → 새 RDD에는 기존 RDD와 같은 양의 entry가 존재
        
        ex) RDD의 숫자를 제곱하기
        
        Map 안에 곱셉 연산 함수를 넣는다.
        
2. flatmap
    - map과 비슷한 연산. 일대다로 변형한다는 점이 다르다.
        
        기존 RDD의 entry를 일대다로 변형한다.
        
        → flatmap으로 변형한 RDD는 기존 RDD보다 크거나 작을 수 있다.
        
3. filter
    - 필요없는 정보를 거를 수 있다.
        
        RDD에 있는 웹 데이터에서 오류가 있는 부분만 보고 싶으면 데이터에서 error가 있는 줄만 추출하고 나머지는 버린다.
        
4. distinct
    - RDD에서 중복된 값은 버림
5. sample
    - RDD 데이터의 일부를 불러냄
        
        큰 데이터를 스크립트에서 버그 없이 실행할 때 유용
        
6. union, intersection, subtract, cartesian
    - 2개의 RDD 간에 쓰이는 연산

## (보편적으로 쓰이는) RDD Actions

RDD에서 원하는 데이터가 있을 때 Action으로 출력

1. collect
    1. 다른 값은 버리고 원하는 값만 출력
2. count
3. countByValue
    1. 값을 세는 연산
    2. RDD에서 특정한 값이 얼마나 많이 발생하는지 센다.
4. take
    1. 최종적으로 완성한 RDD에서 일부 값을 불러낸다.
5. tap
    1. 최종적으로 완성한 RDD에서 일부 값을 불러낸다.
6. reduce
    1. 모든 값에 특정 연산을 해서 하나의 RDD로 합친다.
7. …and more…
