from sqlalchemy import Column, Integer, String, Date, ForeignKey, Numeric, SmallInteger, CheckConstraint, quoted_name
from sqlalchemy.orm import relationship
from src.database.connect import Base

class User(Base):
    __tablename__ = quoted_name("user", True)
    __table_args__ = {"schema": "moviecheck"}

    id_user  = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(50), unique=True, nullable=False)
    name = Column(String(100))
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    birthdate =Column(Date)
    gender = Column(String(20))
    favorite = relationship("Movie", secondary=lambda: Favorite.__table__)
    review = relationship("Review")

class Movie(Base):
    __tablename__ = quoted_name("movie", True)
    __table_args__ = {"schema": "moviecheck"}

    id_movie = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    director = Column(String(100), nullable=False)
    composer = Column(String(100), nullable=False)
    poster = Column(String(255))
    production = Column(String(255), nullable=False)
    year = Column(SmallInteger, nullable=False)
    rating = Column(Numeric(precision=3, scale=2), default=0.00)
    
    genres = relationship("Genre", secondary=lambda: MovieGenre.__table__)
    actors = relationship("Actors", secondary=lambda: MovieActors.__table__)

class Actors(Base):
    __tablename__ = quoted_name("actors", True)
    __table_args__ = {"schema": "moviecheck"}

    id_actor = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)

class MovieActors(Base):
    __tablename__ = quoted_name("movie_actors", True)
    __table_args__ = {"schema": "moviecheck"}
    
    id_movie = Column(Integer, ForeignKey(f"moviecheck.{quoted_name('movie', True)}.id_movie", ondelete="CASCADE"), primary_key=True)
    id_actor = Column(Integer, ForeignKey(f"moviecheck.{quoted_name('actors', True)}.id_actor", ondelete="CASCADE"), primary_key=True)

class Genre(Base):
    __tablename__ = quoted_name("genre", True)
    __table_args__ = {"schema": "moviecheck"}

    id_genre = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)

class MovieGenre(Base):
    __tablename__ = quoted_name("movie_genre", True)
    __table_args__ = {"schema": "moviecheck"}

    id_movie = Column(Integer, ForeignKey(f"moviecheck.{quoted_name('movie', True)}.id_movie", ondelete="CASCADE"), primary_key=True)
    id_genre = Column(Integer, ForeignKey(f"moviecheck.{quoted_name('genre', True)}.id_genre", ondelete="CASCADE"), primary_key=True)

class Favorite(Base):
    __tablename__ = quoted_name("favorite", True)
    __table_args__ = {"schema": "moviecheck"}

    id_user = Column(Integer, ForeignKey(f"moviecheck.{quoted_name('user', True)}.id_user", ondelete="CASCADE"), primary_key=True)
    id_movie = Column(Integer, ForeignKey(f"moviecheck.{quoted_name('movie', True)}.id_movie", ondelete="CASCADE"), primary_key=True)

class Review(Base):
    __tablename__ = quoted_name("review", True)
    __table_args__ = {"schema": "moviecheck"}

    id_review = Column(Integer, primary_key=True, index=True)
    text = Column(String(255), nullable=False)
    created_at = Column(Date, nullable=False)

    id_user = Column(Integer, ForeignKey(User.id_user), nullable=False)
    id_movie = Column(Integer, ForeignKey(Movie.id_movie), nullable=False)

    movie_data = relationship("Movie")

class Rating(Base):
    __tablename__ = quoted_name("rating", True)
    __table_args__ = {"schema": "moviecheck"}

    id_rating = Column(Integer, primary_key=True, index=True)
    id_user = Column(Integer, ForeignKey(User.id_user), nullable=False)
    id_movie = Column(Integer, ForeignKey(Movie.id_movie), nullable=False)
    rating = Column(SmallInteger, CheckConstraint('rating >= 0 AND rating <= 10'), nullable=False)