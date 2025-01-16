from pydantic import BaseModel
from functools import lru_cache
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "RAGnaGROQ"
    
    # CORS Configuration
    # BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    BACKEND_CORS_ORIGINS: List[str] = ["https://ragnagroq.onrender.com"]
    
    # Model Configuration
    DEFAULT_MODEL: str = "llama3-8b-8192"
    
    class Config:
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()