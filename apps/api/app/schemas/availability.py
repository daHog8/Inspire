from pydantic import BaseModel, Field


class AvailabilityOption(BaseModel):
    location_code: str
    location_name: str
    available_quantity: int
    delivery_days_min: int
    delivery_days_max: int
    status: str
    customer_message: str


class ProductAvailability(BaseModel):
    product_id: int
    product_slug: str
    selected_source: str | None
    status: str
    available_quantity: int
    delivery_days_min: int | None
    delivery_days_max: int | None
    customer_message: str
    options: list[AvailabilityOption]


class ReservationRequest(BaseModel):
    product_id: int
    quantity: int = Field(ge=1, le=10)
    session_id: str = Field(min_length=8, max_length=120)


class ReservationResponse(BaseModel):
    reservation_id: str
    product_id: int
    quantity: int
    location_code: str
    expires_in_seconds: int
    customer_message: str
