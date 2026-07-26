from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session, selectinload

from app.db.session import get_db
from app.models import Brand, Category, Inventory, Product
from app.schemas.catalogue import (
    BrandRead,
    CategoryRead,
    ProductListResponse,
    ProductRead,
)

router = APIRouter(tags=["catalogue"])


@router.get("/products", response_model=ProductListResponse)
def list_products(
    search: str | None = None,
    collection: str | None = None,
    product_type: str | None = None,
    volume_ml: int | None = Query(None, ge=1),
    family: str | None = None,
    brand: str | None = None,
    min_price: float | None = Query(None, ge=0),
    max_price: float | None = Query(None, ge=0),
    in_stock: bool | None = None,
    sort: str = Query("name", pattern="^(name|price_asc|price_desc)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(24, ge=1, le=60),
    db: Session = Depends(get_db),
):
    query = (
        select(Product)
        .options(
            selectinload(Product.brand),
            selectinload(Product.category),
            selectinload(Product.images),
            selectinload(Product.inventory),
        )
        .where(Product.is_active.is_(True))
    )

    if search:
        pattern = f"%{search.strip()}%"
        query = query.where(
            or_(
                Product.name.ilike(pattern),
                Product.family.ilike(pattern),
                Product.reference_code.ilike(pattern),
            )
        )
    if collection:
        query = query.where(Product.collection == collection)
    if product_type:
        query = query.where(Product.product_type == product_type)
    if volume_ml:
        query = query.where(Product.volume_ml == volume_ml)
    if family:
        query = query.where(Product.family == family)
    if brand:
        query = query.join(Product.brand).where(Brand.slug == brand)
    if min_price is not None:
        query = query.where(Product.price >= min_price)
    if max_price is not None:
        query = query.where(Product.price <= max_price)
    if in_stock is True:
        query = query.join(Inventory, Inventory.product_id == Product.id).where(
            Inventory.quantity > 0
        )

    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    ordering = (
        Product.price.asc()
        if sort == "price_asc"
        else Product.price.desc()
        if sort == "price_desc"
        else Product.name.asc()
    )
    items = list(
        db.scalars(
            query.order_by(ordering)
            .offset((page - 1) * page_size)
            .limit(page_size)
        ).all()
    )
    return ProductListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/products/{slug}", response_model=ProductRead)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.scalar(
        select(Product)
        .options(
            selectinload(Product.brand),
            selectinload(Product.category),
            selectinload(Product.images),
            selectinload(Product.inventory),
        )
        .where(Product.slug == slug, Product.is_active.is_(True))
    )
    if not product:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    return product


@router.get("/brands", response_model=list[BrandRead])
def brands(db: Session = Depends(get_db)):
    return list(db.scalars(select(Brand).order_by(Brand.name)).all())


@router.get("/categories", response_model=list[CategoryRead])
def categories(db: Session = Depends(get_db)):
    return list(db.scalars(select(Category).order_by(Category.name)).all())
