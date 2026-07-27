from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import InventoryLevel


def resolve_availability(db: Session, product_id: int) -> dict:
    levels = list(
        db.scalars(
            select(InventoryLevel)
            .options(selectinload(InventoryLevel.location))
            .where(InventoryLevel.product_id == product_id)
        ).all()
    )
    levels.sort(key=lambda level: level.location.priority)

    options: list[dict] = []
    for level in levels:
        location = level.location
        quantity = level.sellable_quantity
        if not location.is_active:
            continue

        if location.code == "GABON":
            status = "LOCAL" if quantity > 0 else "OUT_OF_STOCK"
            message = (
                f"Disponible au Gabon — {quantity} exemplaire(s). "
                f"Livraison estimée sous {location.transit_days_min} à "
                f"{location.transit_days_max} jour(s)."
            )
        else:
            status = "FRANCE" if quantity > 0 else "OUT_OF_STOCK"
            message = (
                f"Disponible depuis la France — {quantity} exemplaire(s). "
                f"Livraison estimée au Gabon sous {location.transit_days_min} à "
                f"{location.transit_days_max} jours."
            )

        options.append(
            {
                "location_code": location.code,
                "location_name": location.name,
                "available_quantity": quantity,
                "delivery_days_min": location.transit_days_min,
                "delivery_days_max": location.transit_days_max,
                "status": status,
                "customer_message": message,
            }
        )

    selected = next((option for option in options if option["available_quantity"] > 0), None)
    if selected is None:
        return {
            "selected_source": None,
            "status": "UNAVAILABLE",
            "available_quantity": 0,
            "delivery_days_min": None,
            "delivery_days_max": None,
            "customer_message": "Actuellement indisponible.",
            "options": options,
        }

    return {
        "selected_source": selected["location_code"],
        "status": selected["status"],
        "available_quantity": selected["available_quantity"],
        "delivery_days_min": selected["delivery_days_min"],
        "delivery_days_max": selected["delivery_days_max"],
        "customer_message": selected["customer_message"],
        "options": options,
    }
