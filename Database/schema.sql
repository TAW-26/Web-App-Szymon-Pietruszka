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
	rating NUMERIC(4,2) DEFAULT 0.00
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
DROP TRIGGER IF EXISTS trigger_update_movie_rating ON MovieCheck.rating;

CREATE OR REPLACE FUNCTION update_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE MovieCheck.movie
    SET rating = (
        SELECT COALESCE(ROUND(AVG(rating), 1), 0)
        FROM MovieCheck.rating
        WHERE id_movie = NEW.id_movie
    )
    WHERE movie.id_movie = NEW.id_movie;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_movie_rating
AFTER INSERT OR UPDATE ON MovieCheck.rating
FOR EACH ROW
EXECUTE FUNCTION update_rating();