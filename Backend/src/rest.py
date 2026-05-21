from sqlalchemy import text
from fastapi import APIRouter
from src.database import engine

router  = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Hello There"}

@router.get("/users")
def get_users():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM MovieCheck.user"))
        rows = [dict(row._mapping) for row in result]

    return rows