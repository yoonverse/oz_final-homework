-- =================================================================
-- Database Schema Definition (DDL)
-- 시스템 요구사항: 티켓 예매 시스템 설계
-- 대상 DBMS: MySQL / MariaDB 호환
-- =================================================================

-- 데이터베이스가 없을 경우 생성 (개발/테스트 편의용)
CREATE DATABASE IF NOT EXISTS ticket_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ticket_db;

-- 기존 테이블이 존재할 경우 삭제 (순서 주의: 자식 테이블 seats 부터 삭제)
DROP TABLE IF EXISTS `seats`;
DROP TABLE IF EXISTS `performances`;

-- 1. performances (공연 정보 테이블)
CREATE TABLE `performances` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '공연 고유 ID',
    `title` VARCHAR(100) NOT NULL COMMENT '공연 제목',
    `date` DATETIME NOT NULL COMMENT '공연 일시',
    `venue` VARCHAR(100) NOT NULL COMMENT '공연 장소',
    `price` DECIMAL(10, 2) NOT NULL COMMENT '티켓 가격 (원화/달러 등)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='공연 정보';

-- 2. seats (공연 좌석 정보 테이블 - 공연과 1:N 관계)
CREATE TABLE `seats` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '좌석 고유 ID',
    `performance_id` INT NOT NULL COMMENT '참조하는 공연 ID',
    `seat_number` VARCHAR(20) NOT NULL COMMENT '좌석 번호 (예: A-1, B-12)',
    `grade` VARCHAR(10) NOT NULL COMMENT '좌석 등급 (VIP, R, S, A)',
    `is_booked` BOOLEAN NOT NULL DEFAULT FALSE COMMENT '예약 여부 (FALSE: 예약 가능, TRUE: 예약 완료)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    
    -- 외래키 제약조건 설정: 공연이 삭제되면 해당 공연의 모든 좌석 정보도 함께 삭제되도록 CASCADE 설정
    CONSTRAINT `fk_seats_performance` 
        FOREIGN KEY (`performance_id`) REFERENCES `performances` (`id`) 
        ON DELETE CASCADE,
        
    -- 데이터 무결성 제약조건: 한 공연 내에서 동일한 좌석 번호가 중복 등록되는 것을 방지
    CONSTRAINT `uq_performance_seat` 
        UNIQUE (`performance_id`, `seat_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='공연별 좌석 정보';
