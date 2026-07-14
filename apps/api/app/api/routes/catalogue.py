from fastapi import APIRouter,Depends,HTTPException,Query
from sqlalchemy import func,or_,select
from sqlalchemy.orm import Session,selectinload
from app.db.session import get_db
from app.models import Brand,Category,Inventory,Product
from app.schemas.catalogue import BrandRead,CategoryRead,ProductListResponse,ProductRead
router=APIRouter(tags=["catalogue"])
@router.get("/products",response_model=ProductListResponse)
def list_products(search:str|None=None,collection:str|None=None,brand:str|None=None,min_price:float|None=Query(None,ge=0),max_price:float|None=Query(None,ge=0),in_stock:bool|None=None,sort:str=Query("name",pattern="^(name|price_asc|price_desc)$"),page:int=Query(1,ge=1),page_size:int=Query(12,ge=1,le=48),db:Session=Depends(get_db)):
    q=select(Product).options(selectinload(Product.brand),selectinload(Product.category),selectinload(Product.images),selectinload(Product.inventory)).where(Product.is_active.is_(True))
    if search:
        p=f"%{search.strip()}%";q=q.where(or_(Product.name.ilike(p),Product.family.ilike(p)))
    if collection:q=q.where(Product.collection==collection)
    if brand:q=q.join(Product.brand).where(Brand.slug==brand)
    if min_price is not None:q=q.where(Product.price>=min_price)
    if max_price is not None:q=q.where(Product.price<=max_price)
    if in_stock is True:q=q.join(Inventory,Inventory.product_id==Product.id).where(Inventory.quantity>0)
    total=db.scalar(select(func.count()).select_from(q.subquery())) or 0
    q=q.order_by(Product.price.asc() if sort=="price_asc" else Product.price.desc() if sort=="price_desc" else Product.name.asc())
    items=list(db.scalars(q.offset((page-1)*page_size).limit(page_size)).all())
    return ProductListResponse(items=items,total=total,page=page,page_size=page_size)
@router.get("/products/{slug}",response_model=ProductRead)
def get_product(slug:str,db:Session=Depends(get_db)):
    q=select(Product).options(selectinload(Product.brand),selectinload(Product.category),selectinload(Product.images),selectinload(Product.inventory)).where(Product.slug==slug,Product.is_active.is_(True))
    product=db.scalar(q)
    if not product: raise HTTPException(404,"Produit introuvable")
    return product
@router.get("/brands",response_model=list[BrandRead])
def brands(db:Session=Depends(get_db)):return list(db.scalars(select(Brand).order_by(Brand.name)).all())
@router.get("/categories",response_model=list[CategoryRead])
def categories(db:Session=Depends(get_db)):return list(db.scalars(select(Category).order_by(Category.name)).all())
