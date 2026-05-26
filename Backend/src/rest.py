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

@router.put("/favorite")
def put_movie_to_user_favortie(IDs: structure.PutFavorites, db: Session = Depends(get_db)):
    check_existence = db.query(models.Favorite).filter(models.Favorite.id_user == IDs.id_user, models.Favorite.id_movie == IDs.id_movie).first()
    if check_existence:
         return {"message": "This movie was already add to favortie "}
    
    movie_to_favorites = models.Favorite(id_user=IDs.id_user, id_movie=IDs.id_movie)
    db.add(movie_to_favorites)
    db.commit()

    return{"message": "Movie added to favorties"}

@router.get("/user/{id}/favorites", response_model=structure.FavoriteResponseSchema)
def get_user_favortie(id: int, db: Session = Depends(get_db)):
    favorites = db.query(models.User).options(joinedload(models.User.favorite)).filter(models.User.id_user == id).first()
    if not favorites:
            raise HTTPException(status_code=404, detail="Favortie movies not found")
    
    return favorites

# REVIEW

@router.put("/review")
def put_review(new_review: structure.PutReview, db: Session = Depends(get_db)):
    check_existence = db.query(models.Review).filter(models.Review.id_user == new_review.id_user, models.Review.id_movie == new_review.id_movie).first()
    if check_existence:
         return {"message": "This user already create review for this movie"}
    
    create_review = models.Review(id_user=new_review.id_user, id_movie=new_review.id_movie, text=new_review.text, created_at=new_review.created_at)
    db.add(create_review)
    db.commit()

    return{"message": "New review added to review"}

@router.get("/user/{id}/reviews", response_model=structure.UserReviewsResponseSchema)
def get_user_review(id: int, db: Session = Depends(get_db)):
    reviews = db.query(models.User).options(joinedload(models.User.review).joinedload(models.Review.movie_data)).filter(models.User.id_user == id).first()
    if not reviews:
            raise HTTPException(status_code=404, detail="Reviews movies not found")
    
    return reviews


# RATING

@router.put("/rating")
def put_rating(new_rating: structure.PutRating, db: Session = Depends(get_db)):
    check_existence = db.query(models.Rating).filter(models.Rating.id_user == new_rating.id_user, models.Rating.id_movie == new_rating.id_movie).first()
    if check_existence:
         return {"message": "This user already set rate for this movie"}
    
    create_rating = models.Rating(id_user=new_rating.id_user, id_movie=new_rating.id_movie, rating=new_rating.rating)
    db.add(create_rating)
    db.commit()

    return{"message": "New rate added to rating"}

@router.get("/user/{id}/ratings", response_model=structure.UserRatingResponseSchema)
def get_user_rating(id: int, db: Session = Depends(get_db)):
    rating = db.query(models.User).options(joinedload(models.User.ratings).joinedload(models.Rating.movie_data)).filter(models.User.id_user == id).first()
    if not rating:
            raise HTTPException(status_code=404, detail="Reviews movies not found")
    
    return rating