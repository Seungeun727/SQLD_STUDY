
// MySQL 데이터 타입

// 1. 숫자형

// 1.1 정수형
// -SIGNED :  음수/양수 동시에 저장 (기본값)
// -UNSIGNED: 부호 갖지 않으며, 0보다 큰 양의 정수 저장 (최댓값 SIGNED의 2배)
// * SIGNED/UNSIGNED 성능 문제 X => 최솟값, 최대값의 범위 다름 => 데이터 오류 범하지 않도록 주의
// EX) AUTO_INCREMENT 적용되는 열 음수 저장할 수 없으므로 UNSIGNED 명시 시 작은 데이터 공간에 더 많은 값 저장함
// - 데이터 크기와 범위
// - TINYINT :  1BYTE /SIGNED: -128~127  UNSIGNED: 0~255
// - SMALLINT : 2BYTE /SIGNED: -32,768~32,767  UNSIGNED: 0~65535
// - TINYINT :  1BYTE /SIGNED: -8388608~8388607  UNSIGNED: 0~1677721
// - INT :  4BYTE /SIGNED: -21억~21억  UNSIGNED: 0~약 42억
// - BIGINT :  8BYTE /SIGNED: -2^63~2^63-1  UNSIGNED: 0~2^64-1

// 1.2 실수형
// - 고정 소수점 형식(FLOAT과 DOUBLE) , 부동 소수점 형식은 (DECIMAL과 NUMBER) 
// - FLOAT 타입
//   I) 부동소수점 숫자 저장으로 근사치값으로 저장
//  II) 기본값 4바이트 사용 유효 자릿 수 8개 유지
// III) 정밀도 명시된 경우 최대 8바이트 저장공간을 사용
// - DOUBLE 타입
//  I) 8바이트 공간 사용 최대  16유효 자릿수 유지

// - DECIMAL 타입/ NUMERIC 타입
//  -- 전체 자릿수와 소수 자릿수가 고정된 데이터 유형, 최대 38자리 숫자 사용
//  -- DECIMAL(20,5) 시 정수 15자리 소수 5자리 표현
//  -- DECIMAL(20) 시 정수 20자리까지만 저장

// 1.3 숫자형 변환 주의
// - 숫자형 데이터 사용 시 형 변환 주의
// - 형 변환(Type Casting): 암시적, 명시적 자료형 변경함.
//  -- 암시적 형변환: 자료형 직접 변경하지 않아도 실행 환경에서 자동적 자료형 변환 
//  -- 명시적 형변환: CAST, CONVERT 등 함수 사용, 사용자가 자료형 직접 변경
// - 형변환은 우선 순위가 정의된 프로세스에 따라 수행
// - 데이터 처리 시 발생하는 오류 예방 :  자료형과 형변환 이해 중요! 


// 2. 문자형
// - 다양한 문자 저장 가능한 데이터 유형
// - 고정 길이: 실제 값 입력 X, 지정 공간만큼 사용
// - 가변 길이: 실제 값 입력 공간만큼 사용

// 2.1 문자형 유의 사항
// - 컬럼 저장된 데이터 유형 잘 못 저장/저장 길이 너무 짧은 경우 -> 열의 길이 변경 작업 필요
// - 스키마 변경 작업은 현재 운영 시스템 중단 발생
// - 실제 저장되는 데이터 성격 파악 최적 데이터 유형과 길이 산정 매우 중요
// - 고정 길이인 경우 CHAR 사용함
// - 최대 글자 길이 예측 가능한경우 VARCHAR 사용
// - 가변 길이 저장된 값의 유효 크기 관리 위한 별도의 저장 공간 필요 => 고정 길이에 비해 1-2바이트 저장공간 필요함

// 2-2 문자 데이터 유형
// CHAR:  1-255 바이트, 고정길이, 0-255만큼 문자열 저장
// VARCHAR:  1-65535 바이트, 가변길이, 0-16383만큼 문자열 저장 (한 문자당 최대 4바이트 사용)
// BINARY:  1-255 바이트, 고정길이, 0-255만큼 문자열 저장
// VARBINARY:  1-65535 바이트, 가변길이, 0-16383만큼 문자열 저장 (한 문자당 최대 4바이트 사용)

// * 문자데이터 - 텍스트 형식
// TINYTEXT :  1-255바이트, 최대 255자 문자열 저장
// TEXT :  1-65535바이트, 최대 65,535자 문자열 저장
// MEDIUMTEXT :  1-1677215바이트, 최대 16,777,215자 문자열 저장
// LONGTEXT :  1-4294967...바이트, 최대 4,294,967,295자 문자열 저장

// * 문자데이터 - BLOB 형식
// TINYBLOB :  1-255바이트, 최대 255자 문자열 저장
// BLOB :  1-65535바이트, 최대 65,535자 문자열 저장
// MEDIUMBLOB :  1-1677215바이트, 최대 16,777,215자 문자열 저장
// LONGBLOB :  1-4294967...바이트, 최대 4,294,967,295자 문자열 저장


// MySQL 문자열 타입의 인자 의미
// CHAR/VARCHAR 뒤 인자(숫자값) 의미 타DBMS와 다름 => 바이트가 아닌 문자열의 문자수
// EX) CHAR(5)/VARCHAR(5): 문자 5개 저장

// MySQL 유니코드 
// 숫자/영어: 1바이트, 한글/한문:한글자 당 3바이트 사용
// MySQL에서 유니크도 UTF-8 3바이트, UTF-16 2바이트 사용
// 이모티콘 =>  UFT-8MB4 사용함

// 문자 집합 별 저장공간 크기
// - 아스키 문자: 1바이트
// - 추가 알파벳 문자: 2바이트 저장 공간 사용
// - BMP 문자: 3바이트 저장 공간 사용
// - SMP, SIP 문자:  4바이트 저장 공간 사용
// **MySQL은 레코드에서 TEXT/BLOB 형식 제외한 열 전체 크기 64KB 초과x


// 문자집합
// MYSQL에서 DB뿐만 아니라 테이블, 열까지 모두 서로 다른 character set 사용
// 문자열 저장 (char, varchar, text) 적용된 열에만 사용
// 일반적 EUC-KR / UTF8MB4 문자 집합 사용하고 일본어는 CP932 / UTF8MB4 사용
// 구문 :  SHOW  CHARACTER SET;


// 콜레이션
// 문자열 데이터가 담긴 열의 비교/정렬 순서 위한 규칙
// 콜레이션에 따라 우선순위를 한글, 영어, 대소 문자 구분 등이 결정
// DB 또는 테이블, 열에서 콜레이션이 다를 경우 정렬 작업 한 결과 다름 주의
// 데이터 비교 시 크다, 작다의 판단에 예상치 못한 결과 반환
// 특별 제외 경우 MySQL 기본 설정값 사용함



// 3. 날짜 형식
// - DATETIME
//  -- 문자형, 8BYTE 사용
//  --직접 날짜/시간 입력한 데이터 형식

// -TIMESTAMP
//  --숫자형, 4BYTE 사용
//  --현재 UTC 형식으로 저장한 데이터 형식