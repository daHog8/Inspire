import json
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.core.redis import redis_client
from app.db.session import get_db
from app.models import Product
from app.schemas.availability import ProductAvailability, ReservationRequest, ReservationResponse
from app.services.availability import resolve_availability

router = APIRouter(tags=["availability"])
TTL = 900

@router.get("/products/{slug}/availability", response_model=ProductAvailability)
def product_availability(slug: str, db: Session = Depends(get_db)):
    product = db.scalar(select(Product).where(Product.slug == slug, Product.is_active.is_(True)))
    if product is None:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    result = resolve_availability(db, product.id)
    return ProductAvailability(product_id=product.id, product_slug=product.slug, **result)

@router.post("/reservations", response_model=ReservationResponse, status_code=201)
def create_reservation(payload: ReservationRequest, db: Session = Depends(get_db)):
    product = db.scalar(select(Product).where(Product.id == payload.product_id, Product.is_active.is_(True)))
    if product is None:
        raise HTTPException(status_code=404, detail="Produit introuvable")

    availability = resolve_availability(db, product.id)
    if availability["selected_source"] is None or availability["available_quantity"] < payload.quantity:
        raise HTTPException(status_code=409, detail="Stock insuffisant")

    reservation_id = str(uuid.uuid4())
    redis_client.setex(
        f"inspire:reservation:{reservation_id}",
        TTL,
        json.dumps({
            "reservation_id": reservation_id,
            "session_id": payload.session_id,
            "product_id": payload.product_id,
            "quantity": payload.quantity,
            "location_code": availability["selected_source"],
        }),
    )
    return ReservationResponse(
        reservation_id=reservation_id,
        product_id=payload.product_id,
        quantity=payload.quantity,
        location_code=availability["selected_source"],
        expires_in_seconds=TTL,
        customer_message="Produit réservé pendant 15 minutes.",
    )
