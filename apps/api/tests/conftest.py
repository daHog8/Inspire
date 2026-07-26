import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models import (
    Brand,
    Category,
    Inventory,
    InventoryLevel,
    Product,
    ProductImage,
    StockLocation,
)

engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(bind=engine)


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(autouse=True)
def database():
    Base.metadata.create_all(engine)
    db = TestingSessionLocal()

    brand = Brand(name="Olfazeta", slug="olfazeta")
    category = Category(name="Travel sprays 15 ml", slug="travel-sprays")
    product = Product(
        reference_code="OLF-001",
        product_type="travel-spray",
        name="Éclat Solaire",
        slug="eclat-solaire",
        description="Test",
        collection="Femme",
        family="Floral ambré",
        price=24.90,
        volume_ml=15,
        top_notes=["Bergamote"],
        heart_notes=["Jasmin"],
        base_notes=["Vanille"],
        brand=brand,
        category=category,
    )
    product.images.append(
        ProductImage(
            url="/products/eclat-solaire.jpg",
            alt_text="Éclat Solaire",
            position=0,
        )
    )
    product.inventory = Inventory(quantity=28, low_stock_threshold=5)

    gabon = StockLocation(
        code="GABON",
        name="Stock Gabon",
        country="Gabon",
        transit_days_min=1,
        transit_days_max=2,
        priority=1,
        is_active=True,
    )
    france = StockLocation(
        code="FRANCE",
        name="Stock France",
        country="France",
        transit_days_min=7,
        transit_days_max=12,
        priority=2,
        is_active=True,
    )

    db.add_all([product, gabon, france])
    db.flush()
    db.add_all(
        [
            InventoryLevel(
                product_id=product.id,
                location_id=gabon.id,
                available_quantity=5,
                reserved_quantity=0,
            ),
            InventoryLevel(
                product_id=product.id,
                location_id=france.id,
                available_quantity=23,
                reserved_quantity=0,
            ),
        ]
    )
    db.commit()
    db.close()

    def override():
        session = TestingSessionLocal()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override
    yield
    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
