// 목표: 정규화 개념/ 종류
// 출처: 패캠 강의 개념 정리, 기출 문제 오답 분석!

// 1. 정규화(Normalization)
// 정의 : 다양한 유형 검사로 데이터 모델 구조화/개선시켜 나가는 절차에 관련된 이론
// - 정규화 기본 원칙은 "하나의 테이블에는 중복된 데이터가 없도록 하는 것"
// - 데이터를 수학적인 방법에 의해 구조화/체계적 관리

// 1-1. 정규화 특징
// - 적절한 엔터티 타입에 각각 속성 배치, 엔터티타입 충분히 도출하는 단계적인 분석 방법
// - 엔터티 타입에 속성들이 상호종속적인 관계 갖는 것 배경으로 종속 관계 이용, 엔터티타입 정제하는 방법
// - 각각의 속성들이 데이터 모델에 포함될 수 있는 정규화의 원리를 이용, 데이터 분석방법 활용
// - 현재 데이터 검증, 데이터 표현 관점에서 엔티티 타입 정의하는 데 이용함
// - 엔티티 타입을 개별 데이터 이용한 수학적 접근 방법 분석(Object 별 분석 방법 아님)


// 1-2. 정규화 성능
// 1) 정규화 수행 시 중복 속성 제거, 용량 최소화 가능함
// 2) 일반적 정규화 수행 시 데이터 처리 성능 향상됨
// 3) 반정규화가 조회 성능 향상시키는 것은 아니며, 때때로 정규화에 의해 성능 향상 될 수 있음
// 4) 정규화로 인해 조회 성능이 저할 될 수 있기에 반정규화를 고려함

// 1-3. 정규화 종류
// 1) 1차 정규화 : 복수의 속성값을 갖는 속성 분리
// 2) 2차 정규화: 주식별자에 종속적이지 않는 속성 분리 (부분 종속 속성의 분리)
// 3) 3차 정규화: 속성에 종속적인 속성 분리 (이전 종속 속성 분리)
// 4) 보이스-코드 정규화 : 다수의 주식별자 분리  =>  모든 결정자가 후보키인 정규형
// 5) 4차 정규화 : 다가(다중값) 종속 속성 분리  
// 6) 5차 정규화 : 결합 종속일 경우 두 개 이상의 N개로 분리 => 조인 종속 제거


// * 오브젝트 분석과 정규 엔티티타입 분석 차이
// 1) 오브젝트 분석 :  실세계 발생 현상을 오브젝트 유형별 정리 후 오브젝트 종속 관계
//                    활용하여 엔티티 타입 도출 및 정제함
// 2) 정규화 엔터티 타입 도출: 실세계 발생 데이터 정리, 중복 속성 제거, 종속 관계 활용
//                           주식졀자에 의한 속성 배치, 속성간 종속적인 관계 분리함.


// *. 함수의 종속성
// 정의: 데이터들이 어떤 기준값에 의해 종속되는 현상을 지칭
// 지칭: 기준값을 결정자, 종속되는 값을 종속자라고 지칭.
// - 오브젝트 분석 및 정규화에 의한 엔터티 타입 분석은 모두 어느 식별자에 의한 종속인지 알야하는 전제 필요함


// 1-3) 정규화에 대한 설명

// 1> 1차 정규화
// - 모든 속성은 반드신 하나의 원자값만 보유, 복수의 속성값 가진 속성 분리
// - 테이블 하나의 컬럼에 여러 개의 데이터 값 중복 x
// - 각 속성값이 반복집단이 없는 원자값으로만 그성
// - 모든 엔터티 타입에는 하나의 속성만 존재, 반복된 속성 집단은 별도 엔터티 타입 분리

// 2> 2차 정규화
// - 주식별자에 종속적이지 않고 주식별자 구성하는 일부 속성에 종속적인 속성 분리
// - 1차 정규화 진행 후, 속성 중 주식별자에 종속적이지 않고 주식별자 구성하는 속성의
//   일부에 종속된 부분 종속 속성 분리함
// - 각 속성들은 자신이 속한 테이블의 주 식별자에 의해 완전 함수적 종속 관계가 이루어짐
// - "반드시 자신의 테이블의 주식별자 구성하는 속성이 복합식별자일경우에만 해당"
// - 단일 식별자인 경우 2차 정규화 대상 해당 x
// - 속성간의 종속 관계는 3차 정규화 대상 해당 o


// 3> 3차 정규화
// - 이행함수 종속성 제거, 기본 키 아닌 모든 속성간에서 서로 종속될 수 없음
// - 속성에서 종속적인 속성 분리
// - 1차 정규화/2차 정규화 이후 속성 간의 종속 관계 발생 시 3차 정규화 진행.
// * 이행함수 종속성:  A->B, B-> C 일 경우에만 A->C(이행함수 종속)


// 4> 보이스-코드 정규화
// - 복잡한 식별자 관계에 의해 발생 문제해결 => 3차 정규화 보완한 정규화
// - 데이터 존재하는 식별자가 여러 존재할 경우 식별자가 중복되어 나타나는 현상 제거를 위함
// - 보이스-코드 정규화 대상은 3차 정규화 마친 테이블에 해당
// - "기본키가 아닌 속성이 기본키의 속성을 결정지을 수 없음"


// 5> 4차 정규화
// - 보이스-코드 정규화 만족함, 다치 중속이 없어야 함.
// - 동시에 발생하는 여러 엔터티 타입 간의 관계에서 기인하는 경우 많음
// - 속성간의 종속관계가 존재 시 다치 종속관계에 의한 4차 정규화 대상 x


// 6> 5차 정규화
// - 중복 제거를 위해 분해할 수 있을 만큼 전부 분해
// - PNJF라고 불림, 4NF 만족해야 함
// - 조인 종속이 없어야함
// - 조인 연산 시 데이터 손실이 없어야 함.