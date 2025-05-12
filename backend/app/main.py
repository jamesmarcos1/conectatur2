from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from fastapi.staticfiles import StaticFiles

load_dotenv()

from app.database import engine
from app.models   import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API ConectaTur")

# CORS — já deve estar aqui
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── SERVIR ARQUIVOS ESTÁTICOS ─────────────────────────────────────
# Garante que a pasta exista e monta em /static
os.makedirs("static/images", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
# ────────────────────────────────────────────────────────────────

# ──────── IMPORTS DOS ROUTERS ─────────
from app.routers.events   import router as events_router
from app.routers.guides   import router as guides_router
from app.routers.lodging  import router as lodging_router
from app.routers.gallery  import router as gallery_router

# ──────── INCLUSÃO DOS ROUTERS ────────
app.include_router(events_router)
app.include_router(guides_router)
app.include_router(lodging_router)
app.include_router(gallery_router)
