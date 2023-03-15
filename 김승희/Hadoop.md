## Hadoop

- apache 프로젝트의 MapReduce framework 오픈소스
- HDFS Hadoop Distributed File System
    - 빅 데이터 파일을 여러 대의 컴퓨터에 나누어 저장
    - 각 파일은 여러 개의 순차적인 블록으로 저장
    - 하나의 파일의 각각의 블록은 fault tolerance를 위해 여러 개로 복사되어 여러 머신의 여기 저기 저장됨
        - fault tolerance
            - 시스템을 구성하는 부품의 일부에서 fault(결함) 또는 failure(고장)이 발생해도 정상적 혹은 부분적으로 기능을 수행할 수 있는 것
- 빅 데이터를 수천 대의 값싼 컴퓨터에서 병렬 처리하기 위해 분산
- 주요 구성 요소
    - MapReduce : sw의 수행을 분산
    - Hadoop Distributed File System : 데이터를 분산
- 한 개의 Name node(Master)와 여러 개의 Data Node(slaves)
    - Name node
        - 파일 시스템을 관리하고 클라이언트가 파일에 접근할 수 있게 함
    - Data node
        - 컴퓨터에 들어있는 데이터를 접근할 수 있게 함

### Core Principles

1. Failure Tolerance. 장애 허용
2. Load Balancing - Distributed/Resiliency
    1. 시스템이 실패한 경우에도 다시 시도하는 것
3. Data Loss

### Five Benefits

1. Ressilience 탄력성
    1. 데이터를 중복 저장하기 때문에 회복 탄력성이 있음
2. Scalability 확장성
    1. 분산 환경 내에서 운용되기 때문에 확장성
3. Low Cost 저비용
4. Speed 속도
    1. 복잡한 쿼리 처리 및 MapReduce를 이용한 병행 처리, 동시 처리를 할 수 있음
5. Data Diversity 데이터 다양성
    1. 다양한 타입의 Data

### 하둡의 핵심 기술. Hadoop Components

1. Hadoop Common
    1. 라이브러리와 모듈을 포함
    2. Libraries
    3. 다른 모듈에 의해 필요한 utilities
    
    
2. HDFS
    1. 구글의 GFS를 기반으로 설계
    2. 여러 노드를 한 개로 묶어 시스템을 구축하는데 데이터 중복 저장
    3. Hadoop Distributed File System
    4. Data는 HDFS 안에서 조직적으로 마련된 Block 안에 배열된다.
    5. 이러한 Block들은 투명하게 복제되어 흩어진다.
    6. Intelligent Replication : block 위치를 인지하여 업무 수행 시 최적화 가능
    7. Data Locality(데이터 지역성), Replicated Blocks(복제 블럭), High Probability(높은 가능성) → High Reliability / Aggregate Bandwidth
    8. HDFS 설계 가설
        1. File을 순차적으로 읽어 Full Data Scanning을 지원
        2. data가 저장된 곳에서 연산을 수행
        3. Node Failure가 발생했을 경우 Hardware 교체가 아니라 Software에서 문제를 해결
    
3. Map/Reduce
    1. Distributed Data Processing Frameworks
    2. Map 
        1. 원시 데이터를 받아 key-value 쌍으로 변환하고 배치된 HDFS에 저장
    3. Shuffle
        1. key를 기준으로 정렬
        2. 같은 key면 동일한 Reducer로 
    4. Reduce 
        1. data set을 tuple set으로 합친다.
        2. 모든 key 값을 위한 value를 처리. 이 결과값을 HDFS에 저장하거나 다른 곳에 저장하기도 함
4. YARN
    1. Resource Manager and Scheduler
    2. 자원 관리 및 스케쥴러
    3. Yet Another Resource Negotiator
    4. 시스템 자원의 관리자이며 스케줄러
    5. 연산을 분산하기 위한 추상화 작업을 제공
    6. 기능
        1. Scheduler
            1. 최대한 data locality를 사용
            2. 자원이 잘 연산되도록
        2. Container Management
            1. 실행하는 컨테이너를 지켜보고 초과하지 않는지 감시
        3. Data Locality
        4. Container Isolation
