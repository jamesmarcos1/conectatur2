# backend/app/routers/guides.py

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
import os

router = APIRouter(prefix="/guides", tags=["guides"])

@router.post("/", response_model=schemas.Guide)
def create_guide(guide: schemas.GuideCreate, db: Session = Depends(get_db)):
    db_guide = models.Guide(**guide.dict())
    db.add(db_guide)
    db.commit()
    db.refresh(db_guide)
    return db_guide

@router.get("/", response_model=list[schemas.Guide])
def list_guides(db: Session = Depends(get_db)):
    return db.query(models.Guide).all()

@router.post(
    "/upload",
    response_model=schemas.Guide,
    summary="Upload de foto e cadastro de guia",
    description="Recebe arquivo, nome, descrição e cidade; salva o arquivo e cria o guia"
)
async def upload_guide(
    file: UploadFile = File(...),
    name: str        = Form(...),
    description: str = Form(...),
    city: str        = Form(...),
    db: Session      = Depends(get_db)
):
    # 1) salva o arquivo
    upload_dir = os.path.join(os.getcwd(), "static", "images", "guides")
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # 2) monta a URL pública
    url = f"/static/images/guides/{file.filename}"

    # 3) cria o Guide no banco
    db_guide = models.Guide(name=name, description=description, city=city, photo_url=url)
    db.add(db_guide)
    db.commit()
    db.refresh(db_guide)
    return db_guide

@router.delete(
    "/{guide_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Guide",
    description="Remove um guia pelo seu ID"
)
def delete_guide(
    guide_id: int,
    db: Session = Depends(get_db)
):
    guide = db.query(models.Guide).filter(models.Guide.id == guide_id).first()
    if not guide:
        raise HTTPException(status_code=404, detail="Guia não encontrado")
    db.delete(guide)
    db.commit()
    # 204 No Content não retorna body
