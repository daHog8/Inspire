from fastapi.testclient import TestClient
from app.main import app
client=TestClient(app)
def test_list_products():
    r=client.get("/api/v1/products")
    assert r.status_code==200
    assert len(r.json())==4
def test_unknown_product():
    assert client.get("/api/v1/products/999").status_code==404
