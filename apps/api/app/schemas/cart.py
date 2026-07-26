from pydantic import BaseModel, Field


class CartLineInput(BaseModel):
    product_id: int
    quantity: int = Field(ge=1, le=10)


class CartValidationInput(BaseModel):
    items: list[CartLineInput]


class CartLineResult(BaseModel):
    product_id: int
    name: str
    quantity: int
    unit_price: float
    line_total: float
    available: bool


class CartValidationResult(BaseModel):
    items: list[CartLineResult]
    subtotal: float
    shipping: float
    total: float
