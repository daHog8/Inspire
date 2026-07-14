from fastapi.testclient import TestClient
from app.main import app
client=TestClient(app)
def test_list_products():
    r=client.get("/api/v1/products");assert r.status_code==200;assert r.json()["total"]==1
def test_filter_products():assert client.get("/api/v1/products?collection=Femme").json()["total"]==1
def test_get_product():assert client.get("/api/v1/products/eclat-solaire").status_code==200
def test_unknown_product():assert client.get("/api/v1/products/inconnu").status_code==404
