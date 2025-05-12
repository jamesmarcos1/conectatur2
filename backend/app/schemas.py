# backend/app/schemas.py
from pydantic import BaseModel
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    description: str
    start: datetime
    end: datetime
    city: str

class Event(EventCreate):
    id: int
    class Config:
        from_attributes = True  

# ------------------------------
class GuideCreate(BaseModel):
    name: str
    description: str
    photo_url: str | None = None
    city: str

class Guide(GuideCreate):
    id: int
    class Config:
        from_attributes = True  
        
class LodgingCreate(BaseModel):
    name: str
    address: str
    price: float
    availability: str

class Lodging(LodgingCreate):
    id: int
    class Config:
        from_attributes = True  


class GalleryItemCreate(BaseModel):
    url: str
    caption: str | None = None

class GalleryItem(GalleryItemCreate):
    id: int
    class Config:
        from_attributes = True  