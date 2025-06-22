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
    owner_id: int    # expõe o dono do item
    class Config:
        from_attributes = True 
        
class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    role: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str