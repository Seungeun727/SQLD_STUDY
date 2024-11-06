// SQL 기출 1-61 필수 오답 정리

// 7. 데이터가 존재하지 않은 왼쪽 테이블을 오른쪽 테이블과 같이 변경
//    하고자 할 때 올바른 SQL 문장은? (단, DBMS: SQL Server로 가정) 정답: 4번
// ❶ ALTER TABLE 기관 분류 ALTER COLUMN (분류명 VARCHAR(30), 등록일자 DATE NOT NULL);
// ❷ ALTER TABLE 기관 분류 ALTER COLUMN (분류명 VARCHAR(30), NOT NULL, 등록일자 DATE NOT NULL);
// ❸ ALTER TABLE 기관 분류 ALTER COLUMN 분류명 VARCHAR(30);
//   ALTER TABLE 기관 분류 ALTER COLUMN 등록일자 DATE NOT NULL;
// ❹ ALTER TABLE 기관 분류 ALTER COLUMN 분류명 VARCHAR(30) NOT NULL;
//   ALTER TABLE 기관 분류 ALTER COLUMN 등록일자 DATE NOT NULL;

// 7번 해설
// ❶, ❷ SQL Server 동시 수정 구문 지원 x
// ❸ : 분류명 수정 시 NOT NULL 구문 지정 안하면 기존  NOT NULL 제약 조건 NULL로 변경되게 된다. 


// 13번 : 아래 문장으로 학생 테이블 생성 후 튜플 생성함 SQL1,2 문장 실행 결과는?

// 생성) CREATE 테이블 학생 (학번 CHAR(8) PRIMARY KEY, 장학금 INTEGER);
// SQL1:  SELECT COUNT(*) FROM 학생
// SQL2:  SELECT COUNT(학번) FROM 학생

// ❶ SQL1, 2 문장 실행 결과는 다를 수 있으며 그 이유 장학금 속성에 널값 존재할 수 있기 때문임.
// ❷ SQL1, 2 실행 결과는 항상 다르다.
// ❸ SQL1, 2 실행 결과는 항상 같다.
// ❹ SQL1, 2 실행 결과는 다를 수 있으며 그 이유는 학생 속성에 널값 존재할 수 있기 때문이다.

// 13번 해설 : 학번 컬럼이 PK로 형성 NULL값은 없음 
// SQL1:  SELECT COUNT(*) FROM 학생   => NULL 값 관계 없이 모든 행 반환
// SQL2:  SELECT COUNT(학번) FROM 학생 => 특정 컬럼 NULL 값 제외한 모든 행 반환

// 16번)  4개의 컬럼으로 이루어진 EMP 테이블에서 COLMN 칼럼 삭제하고자 할 때, 
//        SQL 문장의 ㄱ TABLE EMP ㄴ COMM; 안에 들어갈 내용을 기술 하시오.    
//  답:  ㄱ. ALTER, ㄴ: DROP COLUMN

// 18번) STADIUM 테이블의 이름을 STADIUM_JSC로 변경하는 SQL을 작성하시오.(ANSI 표준 기준)
//  답 : RENAME STADIUM TO STADIUM_JSC;


// 19번) 표준 SQL에서 테이블 생성-참조관계 형성 위해 외래키 선언한다. 관계형 DB에서 자식 테이블의 
//       FK 데이터 생성 시 PK 없는 경우, 자식 테이블의 데이터 입력 허용하지 않는 참조동작은?   답: 4번
// ❶  CASCADE , ❷ RESTRICT
// ❸  AUTOMATIC ❹ DEPENDENT


// * 19번 참조동작
// 1-1. DELETE (/MODIFY) ACTION
// 1) CASCADE : 마스터 삭제 시 자식 필드 삭제
// 2) Set Null : 마스터 삭제 시 자식 해당 필드 NULL
// 3) Set Default : 마스터 삭제 시 자식 해당 필드 Default
// 4) Restrict :  자식 테이블에 PK 없는 경우 마스터 삭제 허용함
// 5) No Action : 참조 무결서 위반하는 Action 수행 x

// 1-1. INSERT ACTION
// 1) CASCADE : 마스터 테이블 PK 없음 => 마스터 PK 생성 후 자식 입력
// 2) Set Null : 마스터 테이블 PK 없음 => 자식 외부에 NULL 값 입력
// 3) Set Default : 마스터 테이블 PK 없음 => 자식 외부키 지정 기본값 입력
// 4) Dependent : 마스터키 테이블 PK 없음 => 자식 테이블 입력 허용하지 않음
// 5) No Action : 참조 무결서 위반하는 Action 수행 x


// 41) 아래와 같은 2건의 데이터 상황 시 SQL 수행 결과 옳은 것은? 정답 : 5
//     단 이해를 위해 아래 화살표 줄바꿈 의미 => 실제 저장값은 아님, CHR(10) : ASCII 값 => 줄바꿈의미

const sql_char = `SELECT SUM(CC) FROM 
                  (SELECT(LENGTH(c1)-LENGTH(REPLACE(c1-CHR(10)))+1) CC FROM TAB1)`;      
 
// LENGTH() : 문자열 길이 함수
// CHR: 아스키 코드에 대한 문자 반환 함수 =>  줄바꿈
// REPLACE : 문자열 치환 함수  


// 45. 테이블1보고 실행 결과 옳은 것은? 2번
//   COL1    /     C0L2
//    a             NULL
//    b              ""
//    c              3
//    d              4
//    e              3

// ❶ SELECT COL2 FROM TAB1 WHERE COL1 = 'b'; => 실행결과 x (공집합)
// ❷ SELECT ISNULL(COL2, 'X') FROM TAB1 WHERE COL1 = 'a'; => 실행 결과 x 반환함
// ❸ SELECT COUNT(COL1) FROM TAB1 WHERE COL2 = NULL; => 실행 결과 1
// ❹ SELECT COUNT(COL2) FROM TAB1 WHERE COL1 IN('b', 'c'); => 실행 결과 1

// 45번 해설 
// ❸  실행 결과 0 조회, ❹ 실행결과 2로 조회로 ❷번은 INSULL 함수 결과값 NULL이면 지정값 반환으로 맞음.


// 46번) 사원 테이블에서 MGR 값이 7698과 같으면 NULL 표시하고 같지 않으면 MGR 표시한다. 들어갈 함수명은?
// 보기> SELECT ENAME, EMPNO, MGR, ㄱ(MGR,7698) as NM FROM EMP;

// 정답: NULLIF


// * 단일행 NULL 관련 함수 종류
// NVL(표현식 1, 표현식2) / ISNULL(표현식 1, 표현식2)
// - 표현식1 결과값이 NULL이면 표현식 2 결과값 출력함
// - 단 표현식1 과 표현식 2의 데이터 타입이 같아야 함

// NULLIF
// 표현식 1이 표현식 2와 같으면 NULL, 같지 않으면 표현식 1을 리턴함.

// CALCASE(표현식1, 표현식)
// 임의 개수 표현식에서 NULL이 아닌 최초 표현식 나타남, 모든 표현식 NULL이면 NULL 리턴함


// 47) 다음 중 아래 데이터 가지고 있는 EMP_Q 테이블에서 3개 결과값은? 정답: 4번
//  단 SCOTT의 COMM은 NULL 값

// ENAME(문자) / SAL (숫자) / COMM (숫자)
// KING           0           300
// FORD           5000         0
// SCOTT          1000        공백


// ❶ 0, NULL, NULL           ❷  0, 에러발생, 에러발생
// ❸ 에러 발생, 에러발생, NULL ❹ 0, 에러발생, NULL

// 53) 오류 범하는 SQL 문장을 고르시오. 정답 4번 

// ❶ SELECT 회원 ID, SUM(주문금액) AS 합계
//   FROM 주문 GROUP BY 회원 ID, HAVING COUNT(*) > 1;
// ❷  SELECT 회원 ID, SUM(주문금액) AS 합계 FROM 주문 HAVING AVG(주문금액) > 100;
// ❸ SELECT 메뉴ID, 사용유형코드, COUNT(*) AS CNT
//   FROM 시스템 사용입력 WHERE 사용일시 BETWEEN SYSDATE -1 AND SYSDATE
//   GROUP BY 메뉴 ID, 사용유형 코드 HAVING 메뉴ID = 3 AND 사용유형코드 = 100;
// ❹ SELECT 메뉴ID, 사용유형코드, AVG(COUNT(*)) AS CNT
//   FROM 시스템 사용입력 
//   GROUP BY 메뉴 ID, 사용유형 코드;


// 56) SQL 중 오류 범하는 문장은?

// ❶ SELECT 지역, SUM(매출금액) AS 매출금액
//   FROM 지역별 매출 GROUP BY 지역 ORDER BY 매출금액 DESC;
// ❷ SELECT 지역, 매출금액 
//   FROM 지역별 매출 ORDER BY 년 ASC;
// ❸ SELECT 지역, SUM(매출금액) AS 매출금액
// FROM 지역별 매출 GROUP BY 지역 ORDER BY 년 desc;
// ❹ SELECT 지역, SUM(매출금액) AS 매출금액
//   FROM 지역별 매출 GROUP BY 지역 HAVING SUM(매출금액) > 100 ORDER BY COUNT(*) ASC; 


// 59. 다음 중 SELECT 문장 실행 순서 올바르게 나타난 것은? 정답 4번
//❶ SELECT-FROM-WHERE-GROUPBY-HAVING-ORDERBY
//❷ FROM-SELECT-WHERE-GROUPBY-HAVING-ORDERBY 
//❸ FROM-WHERE-GROUPBY-HAVING-ORDERBY-SELECT 
//❹ FROM-WHERE-GROUPBY-HAVING-SELECT-ORDERBY


// * SELECT 문장 실행 순서

// ❶ 발췌 대상 테이블 참조 [FROM]
// ❷ 발췌 대상 아닌 테이블 데이터 제거 [WHERE]
// ❸ 행들을 소그룹화 [GROUP BY]
// ❹ 그룹핑 된 값의 조건에 맞는 값만을 출력함 [HAVING]
// ❺ 데이터 값 출력/계산 [SELECT]
// ❻ 데이터 정렬 [ORDER BY]

// 61번) 다음 중 5개의 테이블로부터 필요한 컬럼 조회 시 최소 몇 개의 JOIN 조건이 필요한가? 답: 4개

// 61번 해설: 여러 테이블에서 원하는 데이터 조회 시 전체 테이블 개수에서 최소 N-1 조인 조건 필요함

