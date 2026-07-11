from fastapi import FastAPI
from app.database import engine, Base
from app.models import hcp, interaction
from app.routes.hcp import router as hcp_router
from app.routes.interaction import (
    router as interaction_router
)
from app.routes.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(hcp_router)
app.include_router(interaction_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}