# backend/app/models.py

from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Event(Base):
    __tablename__ = "events"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, index=True)
    description = Column(Text)
    start       = Column(DateTime)
    end         = Column(DateTime)
    city        = Column(String, index=True)


class Guide(Base):
     __tablename__ = "guides"
     id          = Column(Integer, primary_key=True, index=True)
     name        = Column(String, index=True)
     description = Column(Text)
     photo_url   = Column(String, nullable=True)
     city        = Column(String, index=True)    # ← adiciona o campo city


class Lodging(Base):
    __tablename__ = "lodgings"
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String, index=True)
    address     = Column(String)
    price       = Column(Float)
    availability= Column(String)  # ex: "Disponível", "Indisponível"

class GalleryItem(Base):
    __tablename__ = "gallery"
    id       = Column(Integer, primary_key=True, index=True)
    url      = Column(String)
    caption  = Column(String, nullable=True)
