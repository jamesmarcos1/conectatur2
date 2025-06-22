# backend/app/routers/gallery.py
from fastapi import (
    APIRouter, Depends, HTTPException, status,
    File, UploadFile, Form
)
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.routers.auth import get_current_user      # <— import do auth
import os

router = APIRouter(prefix="/gallery", tags=["gallery"])

@router.get("/", response_model=list[schemas.GalleryItem])
def list_gallery(db: Session = Depends(get_db)):
    return db.query(models.GalleryItem).all()

@router.post(
    "/upload",
    response_model=schemas.GalleryItem,
    summary="Upload de Imagem",
    description="Só usuários autenticados podem subir — owner_id será marcado"
)
async def upload_gallery_item(
    file: UploadFile = File(...),
    caption: str      = Form(...),
    db: Session       = Depends(get_db),
    current_user: models.User = Depends(get_current_user)   # <— aqui
):
    upload_dir = os.path.join(os.getcwd(), "static", "images")
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    url = f"/static/images/{file.filename}"
    db_item = models.GalleryItem(
        url=url,
        caption=caption,
        owner_id=current_user.id      # <— marca o dono
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Gallery Item",
    description="Só admin ou quem enviou pode deletar o item"
)
def delete_gallery_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)   # <— aqui
):
    item = db.query(models.GalleryItem).filter(models.GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")

    # só admin ou quem é owner pode deletar
    if current_user.role != "admin" and item.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Sem permissão")

    db.delete(item)
    db.commit()
    return
