from sqlalchemy import select
from app.db.session import SessionLocal
from app.models import Brand,Category,Inventory,Product,ProductImage
DATA=[("Éclat Solaire","eclat-solaire","Femme","Floral ambré",89.0,50,["Bergamote"],["Jasmin"],["Vanille"],18),("Nuit Magnétique","nuit-magnetique","Homme","Boisé épicé",95.0,75,["Poivre noir"],["Cèdre"],["Ambre"],12),("Souffle Libre","souffle-libre","Mixte","Hespéridé musqué",82.0,50,["Citron"],["Thé blanc"],["Musc"],25),("Velours Royal","velours-royal","Femme","Gourmand floral",99.0,75,["Rose"],["Praline"],["Santal"],9),("Bois d'Horizon","bois-d-horizon","Homme","Boisé aromatique",92.0,100,["Pamplemousse"],["Vétiver"],["Ambroxan"],14),("Néroli Céleste","neroli-celeste","Mixte","Floral hespéridé",86.0,50,["Citron"],["Néroli"],["Musc"],20)]
def run_seed():
    db=SessionLocal()
    try:
        if db.scalar(select(Product.id).limit(1)) is not None:return
        b=Brand(name="Inspire",slug="inspire",description="Maison de parfums premium.")
        cats={x:Category(name=f"Parfums {x.lower()}",slug=x.lower()) for x in ["Femme","Homme","Mixte"]}
        db.add(b);db.add_all(cats.values());db.flush()
        for name,slug,col,fam,price,vol,top,heart,base,qty in DATA:
            p=Product(name=name,slug=slug,description=f"Une création INSPIRE : {name}.",collection=col,family=fam,price=price,volume_ml=vol,top_notes=top,heart_notes=heart,base_notes=base,brand=b,category=cats[col])
            p.images.append(ProductImage(url=f"/products/{slug}.jpg",alt_text=f"Flacon {name}",position=0));p.inventory=Inventory(quantity=qty,low_stock_threshold=5);db.add(p)
        db.commit();print("Catalogue INSPIRE initialisé.")
    finally:db.close()
if __name__=="__main__":run_seed()
