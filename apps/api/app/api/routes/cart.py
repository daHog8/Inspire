from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db.session import get_db
from app.models import Product
from app.schemas.cart import (
    CartLineResult,
    CartValidationInput,
    CartValidationResult,
)

router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/validate", response_model=CartValidationResult)
def validate_cart(
    payload: CartValidationInput,
    db: Session = Depends(get_db),
) -> CartValidationResult:
    product_ids = [item.product_id for item in payload.items]

    products = db.scalars(
        select(Product)
        .options(selectinload(Product.inventory))
        .where(Product.id.in_(product_ids), Product.is_active.is_(True))
    ).all()

    products_by_id = {product.id: product for product in products}
    result_items: list[CartLineResult] = []

    for requested_item in payload.items:
      product = products_by_id.get(requested_item.product_id)

      if product is None:
          result_items.append(
              CartLineResult(
                  product_id=requested_item.product_id,
                  name="Produit indisponible",
                  quantity=requested_item.quantity,
                  unit_price=0,
                  line_total=0,
                  available=False,
              )
          )
          continue

      stock = product.inventory.quantity if product.inventory else 0
      available = stock >= requested_item.quantity
      line_total = product.price * requested_item.quantity if available else 0

      result_items.append(
          CartLineResult(
              product_id=product.id,
              name=product.name,
              quantity=requested_item.quantity,
              unit_price=product.price,
              line_total=round(line_total, 2),
              available=available,
          )
      )

    subtotal = round(sum(item.line_total for item in result_items), 2)
    shipping = 0 if subtotal == 0 or subtotal >= 120 else 7.90
    total = round(subtotal + shipping, 2)

    return CartValidationResult(
        items=result_items,
        subtotal=subtotal,
        shipping=shipping,
        total=total,
    )
