# backend/app/routers/gallery.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from fastapi import File, UploadFile, Form
import os

router = APIRouter(prefix="/gallery", tags=["gallery"])

@router.post("/", response_model=schemas.GalleryItem)
def create_gallery_item(
    item: schemas.GalleryItemCreate,
    db: Session = Depends(get_db)
):
    db_item = models.GalleryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/", response_model=list[schemas.GalleryItem])
def list_gallery(db: Session = Depends(get_db)):
    return db.query(models.GalleryItem).all()

#Delete
@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Gallery Item",
    description="Remove um item da galeria pelo seu ID"
)
def delete_gallery_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(models.GalleryItem).filter(models.GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    db.delete(item)
    db.commit()
    # como status_code é 204, não devolvemos body
    
# ─── UPLOAD MULTIPART ───────────────────────────────────────────────
@router.post(
    "/upload",
    response_model=schemas.GalleryItem,
    summary="Upload de Imagem",
    description="Recebe um arquivo e um título, salva no servidor e cria o registro"
)
async def upload_gallery_item(
    file: UploadFile = File(...),
    caption: str      = Form(...),
    db: Session       = Depends(get_db)
):
    # salva o arquivo em backend/static/images
    upload_dir = os.path.join(os.getcwd(), "static", "images")
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # monta a URL pública
    url = f"/static/images/{file.filename}"

    # cria o registro no banco
    db_item = models.GalleryItem(url=url, caption=caption)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
# ────────────────────────────────────────────────────────────────