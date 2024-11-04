// 서브 쿼리 
// 아래 sql문 예시처럼 쿼리 내 포함된 또 다른 쿼리
// 조인하지 않은 상태에서 다른 테이블과 일치하는 행 검색, 조인결과를 재조인 시 사용함

const sql = `SELECT first_name, salary FROM employees 
WHERE salary > (SELECT MEDIAN(salary) FROM employees)`;

// 1.1 서브 쿼리 특징
// - 서브 쿼리는 반드시 소괄호로 감싸 사용함
// - 서브 쿼리는 주 쿼리 실행 전 1번만 실행함
// - 비교 연산자에 서브 쿼리를 사용하는 경우 서브 쿼리를 오른쪽 기술함
// - 서브 쿼리 내부에는 정렬 구문인 ORDER BY 문 사용할 수 없음


// 1.2 서브 쿼리 종류

//  1.2-1 WHERE 절 서브 쿼리 (중첩 서브 쿼리)
// - WHERE문에 사용하는 서브 쿼리로 조건문의 일부로 사용한다.
// - 서브쿼리를 비교 연산자와 함께 사용 시 반드시 서브쿼리 반환 결과가 1건 이하일 것.
// - 서브 쿼리 반환 결과가 2건 이상 시 *다중행 연산자 사용 => IN, ANY, ALL, EXISTS, OR, SOME
const sql1 = `SELECT *  FROM customer
WHERE customer_id = (
	SELECT customer_id FROM customer WHERE first_name = 'MIKE')`;

// - * 다중행 연산자 : 서브 쿼리의 결과가 2건 이상일 것
// ALL : 모든 비교 집합일 참일 경우에 해당 데이터 조회
// ANY : 비교 집합 중 하나라도 참이면 해당 데이터 조화
// EXISTS: 하위 커리에 행이 포함되면 데이터 조회
// IN : 피연산자 리스트 중 하나라도 포함되어 있으면 데이터 조회
// OR : OR 기준으로 한 쪽의 부울 표현식이 참이면 해당 데이터 조회
// SOME:  비교 집합 중 일부 참인 경우 데이터 조회

// 다중행 연산자 IN 활용 서브 쿼리    
const sql2 = `SELECT *  FROM customer
              WHERE customer_id = (
	            SELECT customer_id FROM customer WHERE first_name IN('MIKE', 'ANA'))`; 

// 다중행 연산자 ANY 활용 서브 쿼리
const sql3 =  `SELECT * FROM customer WHERE customer_id = ANY 
                (SELECT customer_id 
                 FROM customer 
                WHERE first_name IN ('MIKE', 'ANA'))`;

// 다중행 연산자 EXISTS 활용 서브 쿼리        
const sql4 = `SELECT * FROM customer WHERE EXISTS 
	            (SELECT  customer_id 
		          FROM customer 
		          WHERE first_name IN ('MIKE', 'ANA'))`;
        
// 다중행 연산자 ALL 활용 서브 쿼리
const sql5 = `SELECT * FROM customer WHERE customer_id = ALL
	            (SELECT  customer_id 
		          FROM customer 
		          WHERE first_name IN ('MIKE', 'ANA'))`;

// 1.2-2 FROM 절 서브 쿼리 (인라인 뷰)
// FROM 문에 사용하는 서브 쿼리.
// FROM 문에 서브 쿼리 결과 조인할 수 있고, 논리적으로 쿼리 격리 가능함

// EX) FROM 절 서브 쿼리 사용
const sql6 = `SELECT a.customer_id, a.first_name, a.last_name, a.email,
		         b.address_id, b.address, b.district, b.city_id, b.postal_code,
             c.city, c.country_id,
             d.country
            FROM customer as a
	            INNER JOIN address as b ON a.address_id = b.address_id
              INNER JOIN city as c ON c.city_id = b.city_id
              INNER JOIN country as d on c.country_id = d.country_id`;

// 1.2-3 SELECT 절 서브 쿼리 (스칼라 서브 쿼리)
// -SELECT 문에 사용한느 서브 쿼리
// - 스칼라 서브 쿼리는 1개 이상 사용 
// -반드시 1개의 행을 반환해야 함 => SUM, COUNT, MIN/MAX 등 집계 함수와 사용함

// EX) SELECT 절 서브 쿼리 사용
const sql7= `SELECT a.customer_id, a.first_name, a.last_name, a.email,
             b.address_id, b.address, b.district, b.city_id, b.postal_code,
             (SELECT city FROM city WHERE city_id = b.city_id) as city
              FROM customer as a 
                INNER JOIN address as b ON a.address_id = b.address_id`;



// * 참고
// 문제 : 각 부서별로 최고 급여를 받는 사원을 출력

// --서브 쿼리의 결과 (department_id, max(salary)
const sql_example1 = `SELECT department_id, employee_id, first_name, salary
                      FROM employees
                      WHERE (department_id, salary)
                      IN (SELECT department_id, max(salary) FROM employees
                      GROUP BY department_id)
                      ORDER BY department_id`;    
                      
// 문제 : DEN 보다 늦게 입사한 사원들 출력
// -- 1. Den 입사일 쿼리
const sql_first = `SELECT hire_date FROM employees WHERE first_name = 'Den'`;  
// -- 2. 특정 날짜 이후 입사한 사원 쿼리
const sql_second = `SELECT first_name, hire_date FROM employees WHERE hire_date >= '2002/12/07'`;
// -- 3. 1+2로 서브쿼리 생성
const sql_result = `SELECT first_name, hire_date 
                    FROM employees 
                    WHERE hire_date >= (SELECT hire_date FROM employees WHERE first_name = 'Den')`;                      