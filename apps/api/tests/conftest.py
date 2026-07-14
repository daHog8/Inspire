import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models import Brand,Category,Inventory,Product,ProductImage
engine=create_engine("sqlite://",connect_args={"check_same_thread":False},poolclass=StaticPool)
TestingSessionLocal=sessionmaker(bind=engine)
@pytest.fixture(autouse=True)
def database():
    Base.metadata.create_all(engine);db=TestingSessionLocal();b=Brand(name="Inspire",slug="inspire");c=Category(name="Parfums femme",slug="femme");p=Product(name="Éclat Solaire",slug="eclat-solaire",description="Test",collection="Femme",family="Floral ambré",price=89,volume_ml=50,top_notes=["Bergamote"],heart_notes=["Jasmin"],base_notes=["Vanille"],brand=b,category=c);p.images.append(ProductImage(url="/test.jpg",alt_text="Test",position=0));p.inventory=Inventory(quantity=10,low_stock_threshold=5);db.add(p);db.commit();db.close()
    def override():
        s=TestingSessionLocal()
        try:yield s
        finally:s.close()
    app.dependency_overrides[get_db]=override;yield;app.dependency_overrides.clear();Base.metadata.drop_all(engine)
