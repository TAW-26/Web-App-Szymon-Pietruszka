CREATE SCHEMA MovieCheck;

-- Tablica Użytkowników
CREATE TABLE MovieCheck.user (
    id_user SERIAL PRIMARY KEY,
    nickname VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthdate DATE,
    gender VARCHAR(20)
);

-- Wypisz Użytkowników
SELECT * FROM MovieCheck.user;