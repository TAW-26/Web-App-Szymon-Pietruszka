import os
from dotenv import load_dotenv


load_dotenv()

user = os.getenv('USER')
password = os.getenv('PASSWORD')
host = os.getenv('HOST')
port = os.getenv('PORT')
db = os.getenv('DB')

DATABASE_URL = f'postgresql://{user}:{password}@{host}:{port}/{db}'