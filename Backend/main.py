from sqlalchemy import create_engine, text
from app.config import DATABASE_URL

try:
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Połączenie z bazą danych działa prawidłowo")
        
except Exception as e:
    print(f"Nie udało się połączyć z bazą danych: {e}")