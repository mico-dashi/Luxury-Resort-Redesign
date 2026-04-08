from core.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Bookings(Base):
    __tablename__ = "bookings"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    room_id = Column(Integer, nullable=False)
    room_name = Column(String, nullable=True)
    check_in = Column(String, nullable=True)
    check_out = Column(String, nullable=True)
    guests = Column(Integer, nullable=True)
    total_price = Column(Integer, nullable=True)
    status = Column(String, nullable=True)
    guest_name = Column(String, nullable=True)
    guest_email = Column(String, nullable=True)
    guest_phone = Column(String, nullable=True)
    special_requests = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=True)