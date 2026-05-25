from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import APIRouter
from src.database.connect import engine, get_db
from src.model import models

router  = APIRouter()

models.Base.metadata.create_all(bind=engine)

@router.get("/")
def read_root():
    return {"message": "Hello There"}

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@router.get("/movies")
def get_users(db: Session = Depends(get_db)):
    movies = db.query(models.Movie).all()
    return movies

@router.get("/movie/{id}")
def get_users(id: int, db: Session = Depends(get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id_movie == id).first()
    if not movie:
            raise HTTPException(status_code=404, detail="Movie not found")
    return movie