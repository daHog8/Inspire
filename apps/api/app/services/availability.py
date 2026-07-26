from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from app.models import InventoryLevel

def resolve_availability(db: Session, product_id: int) -> dict:
    levels = db.scalars(
        select(InventoryLevel)
        .options(selectinload(InventoryLevel.location))
        .where(InventoryLevel.product_id == product_id)
    ).all()
    levels = [x for x in levels if x.location.is_active and x.sellable_quantity > 0]
    levels.sort(key=lambda x: x.location.priority)

    if not levels:
        return {
            "selected_source": None,
            "status": "UNAVAILABLE",
            "available_quantity": 0,
            "delivery_days_min": None,
            "delivery_days_max": None,
            "customer_message": "Actuellement indisponible.",
        }

    selected = levels[0]
    location = selected.location

    if location.code == "GABON":
        status = "LOCAL"
        message = (
            f"Disponible au Gabon — {selected.sellable_quantity} exemplaire(s) restant(s). "
            f"Livraison estimée sous {location.transit_days_min} à {location.transit_days_max} jour(s)."
        )
    else:
        status = "FRANCE"
        message = (
            f"Disponible depuis la France — {selected.sellable_quantity} exemplaire(s). "
            f"Livraison estimée au Gabon sous {location.transit_days_min} à {location.transit_days_max} jours."
        )

    return {
        "selected_source": location.code,
        "status": status,
        "available_quantity": selected.sellable_quantity,
        "delivery_days_min": location.transit_days_min,
        "delivery_days_max": location.transit_days_max,
        "customer_message": message,
    }
