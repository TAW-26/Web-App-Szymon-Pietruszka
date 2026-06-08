import sentry_sdk
import logging
import time
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware 
from src.rest import router
from dotenv import load_dotenv

load_dotenv()

sentry_sdk.init(
    dsn=os.getenv('DSN_KEY'),
    send_default_pii=True,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:4000", "http://localhost:80"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

GREEN = "\033[32m"
RED = "\033[31m"
RESET = "\033[0m"

@app.middleware("http")
async def monitor_and_log_requests(request: Request, call_next):
    start_time = time.time()
    
    try:
        response = await call_next(request)
        
        process_time = (time.time() - start_time) * 1000 
        logger.info(f"{GREEN}[DONE] Ścieżka: {request.url.path} Status: {response.status_code} Czas: {process_time:.2f}ms {RESET}")
        
        return response
        
    except Exception as e:
        process_time = (time.time() - start_time) * 1000
        logger.error(f"{RED}[Error] Metoda: {request.method} Ścieżka: {request.url.path} Rodzaj: {type(e).__name__} Komunikat: {str(e)} Czas: {process_time:.2f}ms {RESET}")
        raise e