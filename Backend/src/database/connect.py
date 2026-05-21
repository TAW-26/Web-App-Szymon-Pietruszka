from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.database.config import DATABASE_URL
from sqlalchemy.orm import DeclarativeBase

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Base(DeclarativeBase):
    pass