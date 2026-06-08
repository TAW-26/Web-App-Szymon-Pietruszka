import sentry_sdk
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from src.rest import router
from dotenv import load_dotenv

load_dotenv()

sentry_sdk.init(
    dsn=os.getenv('DSN_KEY'),
    send_default_pii=True,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:4000", "http://localhost:80"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)