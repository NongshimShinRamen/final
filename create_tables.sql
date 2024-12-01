-- 데이터베이스가 없으면 생성하고, 이미 있으면 선택합니다.
CREATE DATABASE IF NOT EXISTS shop;
USE shop;

-- Posts 테이블 생성
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);