from pydantic import BaseModel,ConfigDict
class BrandRead(BaseModel):
    id:int;name:str;slug:str;description:str|None=None
    model_config=ConfigDict(from_attributes=True)
class CategoryRead(BaseModel):
    id:int;name:str;slug:str
    model_config=ConfigDict(from_attributes=True)
class ImageRead(BaseModel):
    id:int;url:str;alt_text:str;position:int
    model_config=ConfigDict(from_attributes=True)
class InventoryRead(BaseModel):
    quantity:int;low_stock_threshold:int
    model_config=ConfigDict(from_attributes=True)
class ProductRead(BaseModel):
    id:int;name:str;slug:str;description:str;collection:str;family:str;price:float;volume_ml:int;top_notes:list[str];heart_notes:list[str];base_notes:list[str];brand:BrandRead;category:CategoryRead;images:list[ImageRead];inventory:InventoryRead|None=None
    model_config=ConfigDict(from_attributes=True)
class ProductListResponse(BaseModel):
    items:list[ProductRead];total:int;page:int;page_size:int
