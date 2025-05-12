# backend/app/routers/lodging.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/lodging", tags=["lodging"])

@router.post("/", response_model=schemas.Lodging)
def create_lodging(
    lodging: schemas.LodgingCreate,
    db: Session = Depends(get_db)
):
    db_lodging = models.Lodging(**lodging.dict())
    db.add(db_lodging)
    db.commit()
    db.refresh(db_lodging)
    return db_lodging

@router.get("/", response_model=list[schemas.Lodging])
def list_lodgings(db: Session = Depends(get_db)):
    return db.query(models.Lodging).all()
