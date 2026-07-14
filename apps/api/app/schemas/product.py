from pydantic import BaseModel, Field
class ProductRead(BaseModel):
    id:int
    name:str
    collection:str
    family:str
    price:float=Field(gt=0)
    notes:list[str]
