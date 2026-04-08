from core.database import Base
from sqlalchemy import Boolean, Column, Float, Integer, String


class Rooms(Base):
    __tablename__ = "rooms"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False)
    description = Column(String, nullable=True)
    short_description = Column(String, nullable=True)
    price_per_night = Column(Integer, nullable=False)
    max_guests = Column(Integer, nullable=True)
    size_sqm = Column(Integer, nullable=True)
    image_url = Column(String, nullable=True)
    category = Column(String, nullable=True)
    amenities = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    is_featured = Column(Boolean, nullable=True)