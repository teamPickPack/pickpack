# Redis
- Key, Value 구조의 비정형 데이터를 저장하고 관리하기 위한 오픈 소스 기반의 비관계형 데이터 베이스 관리 시스템 (DBMS)
- 데이터베이스, 캐시, 메세지 브로커로 사용되며 인메모리 데이터 구조를 가진 저장소
- Key로 올 수 있는 자료형은 기본적으로 String이지만, Value는 문자열, 리스트, 해시, 셋, 정렬된 셋과 같은 다양한 데이터형을 지원
- Redis는 싱글 스레드를 사용하므로 연산을 원자적으로 처리하여 Race Condition이 거의 발생하지 않는다.

<br><br>

## 캐시 서버
- 사용자가 많아질수록 DB에 부하가 많아져서 느려질 수 있다.
- 캐시 서버가 있다면 한 번 읽어온 데이터를 임의의 공간에 저장하여 다음에 읽을 때는 빠르게 결과값을 얻을 있어 DB의 부하를 줄이고 서비스의 속도가 느려지지 않는다.

<br><br>

### 패턴
#### Look aside cache 패턴  (Lazy Loading)
1. 클라이언트가 데이터를 요청

2. 웹서버는 데이터가 존재하는지 Cache 서버에 먼저 확인

3. Cache 서버에 데이터가 있으면 DB에 데이터를 조회하지 않고 Cache 서버에 있는 결과값을 클라이언트에게 바로 반환 (Cache Hit)

4. Cache 서버에 데이터가 없으면 DB에 데이터를 조회하여 Cache 서버에 저장하고 결과값을 클라이언트에게 반환 (Cache Miss)

<br>

#### Write Back 패턴
1. 웹서버는 모든 데이터를 Cache 서버에 저장

2. Cache 서버에 특정 시간 동안 데이터가 저장됨

3. Cache 서버에 있는 데이터를 DB에 저장 (배치)

4. DB에 저장된 Cache 서버의 데이터를 삭제

<br><br>

### 출처
- Redis란? 레디스의 기본적인 개념 (인메모리 데이터 구조 저장소) : https://wildeveloperetrain.tistory.com/21
- [데이터베이스] Redis란? : https://steady-coding.tistory.com/586