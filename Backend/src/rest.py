from fastapi import Depends, HTTPException, Response, status
from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter
from typing import List
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import jwt

from src.database.connect import engine, get_db
from src.model import models
from src.model import structure
from src.config import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM

router  = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

models.Base.metadata.create_all(bind=engine)

def get_user(ID: int, db: Session):
    user = db.query(models.User).filter(models.User.id_user == ID).first()   

    if not user:
        raise HTTPException(status_code=404, detail=f"User with ID {ID} does not exist")
    
    return user

def get_movie(ID: int, db: Session):
    movie = db.query(models.Movie).filter(models.Movie.id_movie == ID).first()   

    if not movie:
        raise HTTPException(status_code=404, detail=f"Movie with ID {ID} does not exist")
    
    return movie

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_JWT(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


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
    user = get_user(id, db)

@router.put("/user")
def put_new_data_user(data: structure.PutNewDataUser, response: Response, db: Session = Depends(get_db)):
    user = get_user(data.id_user, db)

    if data.birthdate:
        user.birthdate = data.birthdate
        
    if data.gender:
        user.gender = data.gender
        
    if data.name and data.name.strip() != "":
        user.name = data.name

    if data.password and data.password.strip() != "":
        hashed_password = pwd_context.hash(data.password)
        user.password = hashed_password

    db.commit()
    db.refresh(user)

    response.status_code = status.HTTP_204_NO_CONTENT
    return {"message": "Updated user data"}

@router.post("/register", response_model=structure.Register, status_code=status.HTTP_201_CREATED)
async def register(user_data: structure.Register, response: Response, db: Session = Depends(get_db)):
    email = db.query(models.User).filter(models.User.email == user_data.email).first()

    if not email:
        raise HTTPException(status_code=400, detail=f"User with email: {user_data.email} already exist")
    
    hashed_password = get_password_hash(user_data.password)

    create_account = models.User(email=user_data.email, nickname=user_data.nickname, password=hashed_password)
    db.add(create_account)
    db.commit()

    response.status_code = status.HTTP_201_CREATED
    return {"email": user_data.email, "nickname": user_data.nickname }

@router.post("/login")
async def login(data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user(data.username, db)

    if verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Niepoprawny e-mail lub hasło", headers={"WWW-Authenticate": "Bearer"})
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_JWT(data={"sub": user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}

# MOVIE

@router.get("/movies", response_model=List[structure.MovieResponseSchema])
def get_movies(db: Session = Depends(get_db)):
    movies = db.query(models.Movie).options(joinedload(models.Movie.genres), joinedload(models.Movie.actors), joinedload(models.Movie.reviews), joinedload(models.Movie.reviews).joinedload(models.Review.user_data)).all()
    return movies

@router.get("/movie/{id}", response_model=structure.MovieResponseSchema)
def get_movie_by_id(id: int, db: Session = Depends(get_db)):
    get_movie(id, db)

    movie = db.query(models.Movie).options(joinedload(models.Movie.genres), joinedload(models.Movie.actors), joinedload(models.Movie.reviews), joinedload(models.Movie.reviews).joinedload(models.Review.user_data)).filter(models.Movie.id_movie == id).first()
    
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    return movie
    

# FAVORITES

@router.post("/favorite")
def post_movie_to_user_favortie(new_favorite: structure.PutFavorites, response: Response, db: Session = Depends(get_db)):
    user = get_user(new_favorite.id_user, db)
    
    movie_exists = db.query(models.Movie).filter(models.Movie.id_movie == new_favorite.id_movie).first()
    if not movie_exists:
        raise HTTPException(status_code=404, detail=f"Movie with ID {new_favorite.id_movie} does not exist")

    check_existence = db.query(models.Favorite).filter(models.Favorite.id_user == new_favorite.id_user, models.Favorite.id_movie == new_favorite.id_movie).first()
    
    if check_existence:
        raise HTTPException(status_code=409, detail="This movie was already add to favortie")
    
    movie_to_favorites = models.Favorite(id_user=new_favorite.id_user, id_movie=new_favorite.id_movie)
    db.add(movie_to_favorites)
    db.commit()

    response.status_code = status.HTTP_201_CREATED
    return{"message": "Movie added to favorties"}

# DELETE TYMCZASOWE BO BEZ JWT

@router.delete("/favorite/{id}")
def delete_movie_from_favorite(id: int, user_id: int, db: Session = Depends(get_db)):
    delete_favorite = db.query(models.Favorite).filter(models.Favorite.id_movie == id).first()

    if not delete_favorite:
        raise HTTPException(status_code=404, detail="Favortie movies not found to delete")
    
    if delete_favorite.id_user != user_id:
        raise HTTPException(status_code=403, detail="You cannot delete this movie from favorite")
    
    db.delete(delete_favorite)
    db.commit()
    return {"message": "Deleted movie from favorite"}

@router.get("/user/{id}/favorites", response_model=structure.FavoriteResponseSchema)
def get_user_favortie(id: int, db: Session = Depends(get_db)):
    favorites = db.query(models.User).options(joinedload(models.User.favorite)).filter(models.User.id_user == id).first()
    
    if not favorites:
        raise HTTPException(status_code=404, detail="Favortie movies not found")
    
    return favorites

# REVIEW

@router.post("/review")
def post_review(new_review: structure.PutReview, response: Response, db: Session = Depends(get_db)):
    get_user(new_review.id_user, db)

    get_movie(new_review.id_movie, db)

    check_existence = db.query(models.Review).filter(models.Review.id_user == new_review.id_user, models.Review.id_movie == new_review.id_movie).first()
    
    if check_existence:
        raise HTTPException(status_code=409, detail="This user already create review for this movie")
    
    create_review = models.Review(id_user=new_review.id_user, id_movie=new_review.id_movie, text=new_review.text, created_at=new_review.created_at)
    db.add(create_review)
    db.commit()

    response.status_code = status.HTTP_201_CREATED
    return{"message": "New review added to review"}

@router.get("/user/{id}/reviews", response_model=structure.UserReviewsResponseSchema)
def get_user_review(id: int, db: Session = Depends(get_db)):
    get_user(id, db)

    reviews = db.query(models.User).options(joinedload(models.User.review).joinedload(models.Review.movie_data)).filter(models.User.id_user == id).first()
    
    if not reviews:
        raise HTTPException(status_code=404, detail="Reviews movies not found")
    
    return reviews


# RATING

@router.post("/rating")
def post_rating(new_rating: structure.PutRating, response: Response, db: Session = Depends(get_db)):
    get_user(new_rating.id_user, db)

    get_movie(new_rating.id_movie, db)

    check_existence = db.query(models.Rating).filter(models.Rating.id_user == new_rating.id_user, models.Rating.id_movie == new_rating.id_movie).first()
    
    if check_existence:
        raise HTTPException(status_code=409, detail="This user already set rate for this movie")
    
    create_rating = models.Rating(id_user=new_rating.id_user, id_movie=new_rating.id_movie, rating=new_rating.rating)
    db.add(create_rating)
    db.commit()

    response.status_code = status.HTTP_201_CREATED
    return{"message": "New rate added to rating"}

@router.get("/user/{id}/ratings", response_model=structure.UserRatingResponseSchema)
def get_user_rating(id: int, db: Session = Depends(get_db)):
    get_user(id, db)

    rating = db.query(models.User).options(joinedload(models.User.ratings).joinedload(models.Rating.movie_data)).filter(models.User.id_user == id).first()
    
    if not rating:
        raise HTTPException(status_code=404, detail="Reviews movies not found")
    
    return rating