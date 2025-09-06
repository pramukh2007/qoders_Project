-- Run this in Postgres before starting backend

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS receipts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  raw_text TEXT,
  ocr_amount NUMERIC,
  final_amount NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
