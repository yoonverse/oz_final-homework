-- =================================================================
-- Test Data Insertion (DML)
-- 시스템 요구사항: 기초 데이터 입력 및 1:N 관계 검증용 테스트 데이터 구성
-- 대상 DBMS: MySQL / MariaDB 호환
-- =================================================================

USE ticket_db;

-- 기존 데이터 초기화 (외래키 제약조건에 의해 seats 데이터도 자동으로 삭제됨)
-- 안전한 삭제를 위해 TRUNCATE 대신 DELETE 사용 (FOREIGN KEY 제약조건이 걸려있으므로)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `seats`;
TRUNCATE TABLE `performances`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. 공연 (performances) 기초 데이터 입력
INSERT INTO `performances` (`id`, `title`, `date`, `venue`, `price`) VALUES
(1, '아이유 러브 포엠 콘서트', '2026-06-15 19:00:00', '잠실종합운동장 올림픽주경기장', 150000.00),
(2, '뮤지컬 레미제라블', '2026-07-20 14:00:00', '블루스퀘어 신한카드홀', 120000.00),
(3, '조성진 피아노 리사이틀', '2026-08-05 20:00:00', '예술의전당 콘서트홀', 110000.00),
(4, '락 페스티벌 2026 (좌석 없음 테스트용)', '2026-09-01 12:00:00', '난지한강공원 젊음의광장', 90000.00);

-- 2. 좌석 (seats) 기초 데이터 입력

-- [공연 1] 아이유 콘서트 (일부 좌석 예매됨 - 일반적인 예매 진행 중인 공연)
-- VIP 2석, R 2석, S 2석 중 VIP-1, R-1만 예매됨
INSERT INTO `seats` (`performance_id`, `seat_number`, `grade`, `is_booked`) VALUES
(1, 'A-1', 'VIP', TRUE),   -- 예매 완료
(1, 'A-2', 'VIP', FALSE),  -- 예매 가능
(1, 'B-1', 'R', TRUE),     -- 예매 완료
(1, 'B-2', 'R', FALSE),    -- 예매 가능
(1, 'C-1', 'S', FALSE),    -- 예매 가능
(1, 'C-2', 'S', FALSE);    -- 예매 가능

-- [공연 2] 뮤지컬 레미제라블 (모든 좌석 예매됨 - 매진된 공연)
-- VIP 2석, S 2석, A 2석 모두 예매 완료
INSERT INTO `seats` (`performance_id`, `seat_number`, `grade`, `is_booked`) VALUES
(2, 'VIP-01', 'VIP', TRUE), -- 예매 완료
(2, 'VIP-02', 'VIP', TRUE), -- 예매 완료
(2, 'S-01', 'S', TRUE),     -- 예매 완료
(2, 'S-02', 'S', TRUE),     -- 예매 완료
(2, 'A-01', 'A', TRUE),     -- 예매 완료
(2, 'A-02', 'A', TRUE);     -- 예매 완료

-- [공연 3] 조성진 피아노 리사이틀 (예약된 좌석이 단 하나도 없음 - 얼리버드 대상 공연)
-- R 2석, S 2석, A 2석 모두 예매 안 됨
INSERT INTO `seats` (`performance_id`, `seat_number`, `grade`, `is_booked`) VALUES
(3, 'R-11', 'R', FALSE),   -- 예매 가능
(3, 'R-12', 'R', FALSE),   -- 예매 가능
(3, 'S-21', 'S', FALSE),   -- 예매 가능
(3, 'S-22', 'S', FALSE),   -- 예매 가능
(3, 'A-31', 'A', FALSE),   -- 예매 가능
(3, 'A-32', 'A', FALSE);   -- 예매 가능

-- [공연 4] 락 페스티벌 2026 (좌석이 단 하나도 매핑되지 않은 공연)
-- 이 공연은 seats 테이블에 아무런 좌석도 등록되지 않았습니다.
-- 얼리버드(예약 좌석이 0인 것) 집계 시 좌석 자체가 없는 공연도 포함시킬지 여부에 대한 엣지 케이스를 다루기 위해 포함함.
