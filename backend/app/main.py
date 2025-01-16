from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.config import settings

app = FastAPI(title="RAGnaGROQ API")

# Add CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ragnagroq.onrender.com"],
    # allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to SearchChat API"}