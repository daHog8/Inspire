from fastapi import APIRouter,HTTPException
from app.schemas.product import ProductRead
router=APIRouter(prefix="/products",tags=["products"])
PRODUCTS=[ProductRead(id=1,name="Éclat Solaire",collection="Femme",family="Floral ambré",price=89,notes=["Bergamote","Jasmin","Vanille"]),ProductRead(id=2,name="Nuit Magnétique",collection="Homme",family="Boisé épicé",price=95,notes=["Poivre noir","Cèdre","Ambre"]),ProductRead(id=3,name="Souffle Libre",collection="Mixte",family="Hespéridé musqué",price=82,notes=["Citron","Thé blanc","Musc"]),ProductRead(id=4,name="Velours Royal",collection="Femme",family="Gourmand floral",price=99,notes=["Rose","Praline","Santal"])]
@router.get("",response_model=list[ProductRead])
def list_products(): return PRODUCTS
@router.get("/{product_id}",response_model=ProductRead)
def get_product(product_id:int):
    for p in PRODUCTS:
        if p.id==product_id:return p
    raise HTTPException(status_code=404,detail="Produit introuvable")
