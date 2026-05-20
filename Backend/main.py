from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine, text
from fastapi import FastAPI, Depends
from app.config import DATABASE_URL

app = FastAPI()

try:
    engine = create_engine(DATABASE_URL)

    SessionLocal = sessionmaker(autoflush=False, bind=engine)
    print("Połączenie z bazą danych działa prawidłowo")
        
except Exception as e:
    print(f"Nie udało się połączyć z bazą danych: {e}")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Serwer FastAPI działa lokalnie!"}