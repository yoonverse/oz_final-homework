-- =================================================================
-- SQL Query Execution Examples (DQL)
-- 시스템 요구사항: 데이터 조회 및 비즈니스 조건 검증을 위한 쿼리문
-- 대상 DBMS: MySQL / MariaDB 호환
-- =================================================================

USE ticket_db;

-- -----------------------------------------------------------------
-- [요구사항 1] 특정 공연의 예약 가능한 좌석 현황을 확인하는 JOIN 쿼리
-- -----------------------------------------------------------------
-- 설명:
-- 1. `performances` (공연) 테이블과 `seats` (좌석) 테이블을 `id` 및 `performance_id` 기준으로 INNER JOIN 합니다.
-- 2. `is_booked = FALSE` (0) 조건을 부여하여 예약되지 않은(즉, 예매 가능한) 좌석만 필터링합니다.
-- 3. 특정 공연(여기서는 '아이유 러브 포엠 콘서트', id = 1)을 타겟팅하여 조회합니다.

-- 예시 A: 특정 공연 ID (id = 1)로 조회하는 경우
SELECT 
    p.id AS performance_id,
    p.title AS performance_title,
    p.date AS performance_date,
    s.seat_number,
    s.grade,
    s.price AS seat_price, -- 기본 공연 가격
    s.is_booked
FROM performances p
INNER JOIN seats s ON p.id = s.performance_id
WHERE p.id = 1 
  AND s.is_booked = FALSE
ORDER BY s.grade DESC, s.seat_number ASC;

-- 예시 B: 공연 제목 키워드 검색을 통해 예약 가능한 좌석을 조회하는 경우
SELECT 
    p.title AS performance_title,
    p.venue AS venue_name,
    s.seat_number,
    s.grade,
    s.is_booked
FROM performances p
INNER JOIN seats s ON p.id = s.performance_id
WHERE p.title LIKE '%아이유%' 
  AND s.is_booked = FALSE
ORDER BY s.seat_number ASC;


-- -----------------------------------------------------------------
-- [추가 과제 - 선택] 예약된 좌석이 하나도 없는 '얼리버드 대상' 공연 목록 조회
-- -----------------------------------------------------------------

-- 방법 1: GROUP BY 및 HAVING 구문을 이용한 집계 방식 (가장 추천 및 직관적)
-- 설명:
-- 1. 두 테이블을 INNER JOIN 하여 좌석이 등록되어 있는 공연들을 모읍니다.
-- 2. 공연별로 그룹화(`GROUP BY p.id`) 합니다.
-- 3. `SUM(s.is_booked)`를 통해 각 공연별 '예약된 좌석 수'를 합산합니다. 
--    (MySQL에서 BOOLEAN은 0 또는 1이므로 SUM 연산이 가능합니다.)
-- 4. `HAVING SUM(s.is_booked) = 0` 조건을 걸어 예약된 좌석이 하나도 없는 공연만 필터링합니다.
-- 결과 예측: 3번 '조성진 피아노 리사이틀'만 출력되어야 합니다 (4번 '락 페스티벌'은 등록된 좌석이 없으므로 INNER JOIN에서 제외됨).
SELECT 
    p.id AS performance_id,
    p.title AS performance_title,
    p.date AS performance_date,
    p.venue AS venue_name,
    p.price AS base_price,
    COUNT(s.id) AS total_seats,
    SUM(s.is_booked) AS booked_seats_count
FROM performances p
INNER JOIN seats s ON p.id = s.performance_id
GROUP BY p.id, p.title, p.date, p.venue, p.price
HAVING SUM(s.is_booked) = 0
ORDER BY p.date ASC;


-- 방법 2: EXISTS / NOT EXISTS 서브쿼리를 이용한 정교한 방식 (성능 최적화 및 도메인 정밀화)
-- 설명:
-- 1. `EXISTS`: 최소한 좌석이 1개 이상 생성/등록되어 있는 공연을 의미합니다. (좌석이 전혀 없는 4번 공연 제외)
-- 2. `NOT EXISTS`: 해당 공연의 좌석 중에서 `is_booked = TRUE` (예약 완료된 것)가 단 하나도 존재하지 않는 공연을 의미합니다.
-- 이 쿼리는 대량 데이터 상황에서 인덱스를 활용하여 매우 빠르게 수행될 수 있습니다.
SELECT 
    p.id AS performance_id,
    p.title AS performance_title,
    p.date AS performance_date,
    p.venue AS venue_name,
    p.price AS base_price
FROM performances p
WHERE 
    -- 조건 1: 등록된 좌석이 최소 1개 이상 존재하는 공연
    EXISTS (
        SELECT 1 
        FROM seats s 
        WHERE s.performance_id = p.id
    )
    -- 조건 2: 등록된 좌석 중 예약된(is_booked = TRUE) 좌석이 단 하나도 존재하지 않는 공연
    AND NOT EXISTS (
        SELECT 1 
        FROM seats s 
        WHERE s.performance_id = p.id AND s.is_booked = TRUE
    )
ORDER BY p.date ASC;


-- [참고] 만약 '등록된 좌석조차 아예 없는 공연'도 예약된 좌석이 0개인 것으로 보아 얼리버드 대상으로 포함해야 한다면?
-- LEFT JOIN을 사용하거나 단순 NOT EXISTS만 사용하는 경우 아래처럼 작성할 수 있습니다.
SELECT 
    p.id AS performance_id,
    p.title AS performance_title,
    p.price AS base_price
FROM performances p
WHERE NOT EXISTS (
    SELECT 1 
    FROM seats s 
    WHERE s.performance_id = p.id AND s.is_booked = TRUE
)
ORDER BY p.id ASC;
