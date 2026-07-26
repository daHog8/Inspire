from sqlalchemy import ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class InventoryLevel(Base):
    __tablename__ = "inventory_levels"
    __table_args__ = (UniqueConstraint("product_id", "location_id", name="uq_inventory_product_location"),)
    id: Mapped[int] = mapped_column(primary_key=True)
    available_quantity: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    reserved_quantity: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    location_id: Mapped[int] = mapped_column(ForeignKey("stock_locations.id", ondelete="CASCADE"), nullable=False)
    product = relationship("Product", back_populates="inventory_levels")
    location = relationship("StockLocation", back_populates="inventory_levels")

    @property
    def sellable_quantity(self) -> int:
        return max(self.available_quantity - self.reserved_quantity, 0)
