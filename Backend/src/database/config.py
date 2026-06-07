import os
from dotenv import load_dotenv


load_dotenv()

user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST', 'postgres_db')
port = os.getenv('DB_PORT', '5432')
db = os.getenv('DB_NAME')

DATABASE_URL = f'postgresql://{user}:{password}@{host}:{port}/{db}'