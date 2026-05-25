-- MOVIECHECK DATABASE --
CREATE SCHEMA IF NOT EXISTS MovieCheck;



-- MOVIE --
CREATE TABLE IF NOT EXISTS MovieCheck.movie (
    id_movie SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
	description VARCHAR(255) NOT NULL,
	director VARCHAR(100) NOT NULL,
	composer VARCHAR(100) NOT NULL,
	poster VARCHAR(255), -- NOT NULL jak na razie bez
	production VARCHAR(255) NOT NULL,
	year SMALLINT NOT NULL,
	rating NUMERIC(3,2) DEFAULT 0.00
);


-- ACTORS --
CREATE TABLE IF NOT EXISTS MovieCheck.actors (
	id_actor SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);


-- MOVIE ACTORS --
CREATE TABLE IF NOT EXISTS MovieCheck.movie_actors (
	id_movie INT,
    id_actor INT,
    
    CONSTRAINT movie_FK 
        FOREIGN KEY (id_movie) REFERENCES MovieCheck.movie(id_movie) ON DELETE CASCADE,
        
    CONSTRAINT actor_FK 
        FOREIGN KEY (id_actor) REFERENCES MovieCheck.actors(id_actor) ON DELETE CASCADE,
        
    PRIMARY KEY (id_movie, id_actor)
);


-- GENRE --
CREATE TABLE IF NOT EXISTS MovieCheck.genre (
	id_genre SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);


-- MOVIE GENRE --
CREATE TABLE IF NOT EXISTS MovieCheck.movie_genre (
	id_movie INT,
    id_genre INT,
    
    CONSTRAINT movie_FK 
        FOREIGN KEY (id_movie) REFERENCES MovieCheck.movie(id_movie) ON DELETE CASCADE,
        
    CONSTRAINT genre_FK 
        FOREIGN KEY (id_genre) REFERENCES MovieCheck.genre(id_genre) ON DELETE CASCADE,
        
    PRIMARY KEY (id_movie, id_genre)
);


-- USERS --
CREATE TABLE IF NOT EXISTS MovieCheck.user (
    id_user SERIAL PRIMARY KEY,
    nickname VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthdate DATE,
    gender VARCHAR(20)
);


-- FAVORITE --
CREATE TABLE IF NOT EXISTS MovieCheck.favorite (
	id_user INT,
    id_movie INT,
	
    CONSTRAINT user_FK 
        FOREIGN KEY (id_user) REFERENCES MovieCheck.user(id_user) ON DELETE CASCADE,
   
    CONSTRAINT movie_FK 
        FOREIGN KEY (id_movie) REFERENCES MovieCheck.movie(id_movie) ON DELETE CASCADE,
             
    PRIMARY KEY (id_user, id_movie)
);


-- REVIEW --
CREATE TABLE IF NOT EXISTS MovieCheck.review (
	id_review SERIAL PRIMARY KEY,
	id_user INT,
    id_movie INT,
	text VARCHAR(255) NOT NULL,
	created_at DATE NOT NULL, 
	
    CONSTRAINT user_FK 
        FOREIGN KEY (id_user) REFERENCES MovieCheck.user(id_user) ON DELETE CASCADE,
   
    CONSTRAINT movie_FK 
        FOREIGN KEY (id_movie) REFERENCES MovieCheck.movie(id_movie) ON DELETE CASCADE
);

-- RATING --
CREATE TABLE IF NOT EXISTS MovieCheck.rating (
	id_rating SERIAL PRIMARY KEY,
	id_user INT,
    id_movie INT,
	rating SMALLINT CHECK (rating >= 0 AND rating <= 10),
	
    CONSTRAINT user_FK 
        FOREIGN KEY (id_user) REFERENCES MovieCheck.user(id_user) ON DELETE CASCADE,
   
    CONSTRAINT movie_FK 
        FOREIGN KEY (id_movie) REFERENCES MovieCheck.movie(id_movie) ON DELETE CASCADE
);


-- TRIGGER RATING UPDATE --
CREATE OR REPLACE FUNCTION update_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE movie
    SET rating = (
        SELECT COALESCE(ROUND(AVG(rating), 2), 0)
        FROM MovieCheck.rating
        WHERE id_movie = COALESCE(NEW.id_movie, OLD.id_movie)
    )
    WHERE movie.id_movie = COALESCE(NEW.id_movie, OLD.id_movie);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;




-- EXAMPLES DATA --
INSERT INTO MovieCheck.user (nickname, name, email, password, birthdate, gender) VALUES
	('jandow', 'Jan Dow', 'jan.dow@example.com', 'super_tajne_haslo_123', '1995-04-12', 'Mężczyzna');

INSERT INTO MovieCheck.movie (title, description, director, composer, production, year) VALUES 
	('Piraci z Karaibów: Klątwa Czarnej Perły', 'opis', 'Gore Verbinski', 'Hans Zimmer', 'Jerry Bruckheimer', 2003),
	('Interstellar', 'opis', 'Christopher Nolan', 'Hans Zimmer', 'Emma Thomas, Christopher Nolan, Lynda Obst', 2014)

INSERT INTO MovieCheck.actors (name) VALUES
	('Johnny Depp'),
	('Orlando Bloom'),
	('Keira Knightley'),
	('Geoffrey Rush'),
	('Jack Davenport'),
	('Jonathan Pryce'),
	('Matthew McConaughey'),
	('Anne Hathaway'),
	('Jessica Chastain'),
	('Mackenzie Foy'),
	('Michael Caine'),
	('Matt Damon');

INSERT INTO MovieCheck.movie_actors (id_movie, id_actor) VALUES
	(4, 1),
	(4, 2),
	(4, 3),
	(4, 4),
	(4, 5),
	(4, 6),
	
	(5, 7),
	(5, 8),
	(5, 9),
	(5, 10),
	(5, 11),
	(5, 12);

INSERT INTO moviecheck.genre (name) 
VALUES 
    ('Adventure'),
    ('Action'),
    ('Fantasy');

INSERT INTO moviecheck.movie_genre (id_movie, id_genre)
SELECT 4, id_genre 
FROM moviecheck.genre 
WHERE name IN ('Action', 'Adventure');

INSERT INTO moviecheck.favorite (id_user, id_movie) 
VALUES 
    (1, 4);

INSERT INTO moviecheck.review (id_user, id_movie, text, created_at)
VALUES 
    (1, 4, 'Hello there', '2026-05-20');

SELECT * FROM MovieCheck.user;

SELECT * FROM MovieCheck.movie;

SELECT * FROM MovieCheck.actors;

SELECT m.title AS movie, a.name AS actors 
FROM MovieCheck.movie_actors ma 
JOIN MovieCheck.movie m ON ma.id_movie = m.id_movie
JOIN MovieCheck.actors a ON ma.id_actor = a.id_actor
WHERE m.id_movie IN (4,5)