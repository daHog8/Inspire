from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class StockLocation(Base):
    __tablename__ = "stock_locations"
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    country: Mapped[str] = mapped_column(String(80), nullable=False)
    transit_days_min: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    transit_days_max: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    priority: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    inventory_levels = relationship("InventoryLevel", back_populates="location", cascade="all, delete-orphan")
