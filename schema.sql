CREATE DATABASE IF NOT EXISTS grafico_demo;
USE grafico_demo;
CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `brand.code` VARCHAR(80) NOT NULL,
  `category.code` VARCHAR(80) NOT NULL,
  value DECIMAL(12,2) NOT NULL
);
-- Synthetic records for a fresh local demo database. Run once.
INSERT INTO product (`brand.code`, `category.code`, value) VALUES
('Marca A', 'Audio', 120), ('Marca A', 'Audio', 180),
('Marca B', 'Video', 300), ('Marca C', 'Video', 220), ('Marca B', 'Audio', 90);
