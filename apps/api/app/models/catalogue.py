from sqlalchemy import JSON,Boolean,Float,ForeignKey,Integer,String,Text
from sqlalchemy.orm import Mapped,mapped_column,relationship
from app.db.base import Base
class Brand(Base):
    __tablename__="brands"
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]=mapped_column(String(120),unique=True)
    slug:Mapped[str]=mapped_column(String(140),unique=True)
    description:Mapped[str|None]=mapped_column(Text,nullable=True)
    products=relationship("Product",back_populates="brand")
class Category(Base):
    __tablename__="categories"
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]=mapped_column(String(120),unique=True)
    slug:Mapped[str]=mapped_column(String(140),unique=True)
    products=relationship("Product",back_populates="category")
class Product(Base):
    __tablename__="products"
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]=mapped_column(String(180))
    slug:Mapped[str]=mapped_column(String(200),unique=True,index=True)
    description:Mapped[str]=mapped_column(Text)
    collection:Mapped[str]=mapped_column(String(30))
    family:Mapped[str]=mapped_column(String(120))
    price:Mapped[float]=mapped_column(Float)
    volume_ml:Mapped[int]=mapped_column(Integer)
    top_notes:Mapped[list[str]]=mapped_column(JSON)
    heart_notes:Mapped[list[str]]=mapped_column(JSON)
    base_notes:Mapped[list[str]]=mapped_column(JSON)
    is_active:Mapped[bool]=mapped_column(Boolean,default=True)
    brand_id:Mapped[int]=mapped_column(ForeignKey("brands.id"))
    category_id:Mapped[int]=mapped_column(ForeignKey("categories.id"))
    brand=relationship("Brand",back_populates="products")
    category=relationship("Category",back_populates="products")
    images=relationship("ProductImage",back_populates="product",cascade="all, delete-orphan")
    inventory=relationship("Inventory",back_populates="product",uselist=False,cascade="all, delete-orphan")
class ProductImage(Base):
    __tablename__="product_images"
    id:Mapped[int]=mapped_column(primary_key=True)
    url:Mapped[str]=mapped_column(String(500))
    alt_text:Mapped[str]=mapped_column(String(255))
    position:Mapped[int]=mapped_column(default=0)
    product_id:Mapped[int]=mapped_column(ForeignKey("products.id",ondelete="CASCADE"))
    product=relationship("Product",back_populates="images")
class Inventory(Base):
    __tablename__="inventory"
    id:Mapped[int]=mapped_column(primary_key=True)
    quantity:Mapped[int]=mapped_column(default=0)
    low_stock_threshold:Mapped[int]=mapped_column(default=5)
    product_id:Mapped[int]=mapped_column(ForeignKey("products.id",ondelete="CASCADE"),unique=True)
    product=relationship("Product",back_populates="inventory")
