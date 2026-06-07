from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from src.rest import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:4000", "http://localhost:80"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)