from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter
from typing import List

from src.database.connect import engine, get_db
from src.model import models
from src.model import structure

router  = APIRouter()

models.Base.metadata.create_all(bind=engine)

@router.get("/")
def read_root():
    return {"message": "Hello There"}

# USER

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@router.get("/user/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id_user == id).first()
    if not user:
            raise HTTPException(status_code=404, detail="User not found")
    
    return user


# MOVIE

@router.get("/movies", response_model=List[structure.MovieResponseSchema])
def get_movies(db: Session = Depends(get_db)):
    movies = db.query(models.Movie).options(joinedload(models.Movie.genres), joinedload(models.Movie.actors), joinedload(models.Movie.reviews), joinedload(models.Movie.reviews).joinedload(models.Review.user_data)).all()
    return movies

@router.get("/movie/{id}", response_model=structure.MovieResponseSchema)
def get_movie_by_id(id: int, db: Session = Depends(get_db)):
    movie = db.query(models.Movie).options(joinedload(models.Movie.genres), joinedload(models.Movie.actors), joinedload(models.Movie.reviews), joinedload(models.Movie.reviews).joinedload(models.Review.user_data)).filter(models.Movie.id_movie == id).first()
    if not movie:
            raise HTTPException(status_code=404, detail="Movie not found")
    
    return movie
    

# FAVORITES

@router.get("/user/{id}/favorites", response_model=structure.FavoriteResponseSchema)
def get_user_favortie(id: int, db: Session = Depends(get_db)):
    favorites = db.query(models.User).options(joinedload(models.User.favorite)).filter(models.User.id_user == id).first()
    if not favorites:
            raise HTTPException(status_code=404, detail="Favortie movies not found")
    
    return favorites

# REVIEW

@router.get("/user/{id}/reviews", response_model=structure.UserReviewsResponseSchema)
def get_user_favortie(id: int, db: Session = Depends(get_db)):
    reviews = db.query(models.User).options(joinedload(models.User.review).joinedload(models.Review.movie_data)).filter(models.User.id_user == id).first()
    if not reviews:
            raise HTTPException(status_code=404, detail="Reviews movies not found")
    
    return reviews