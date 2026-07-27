from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_validate_cart() -> None:
    response = client.post(
        "/api/v1/cart/validate",
        json={"items": [{"product_id": 1, "quantity": 2}]},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["items"][0]["available"] is True
    assert payload["subtotal"] == 49.8
    assert payload["shipping"] == 7.9
    assert payload["total"] == 57.7


def test_validate_unknown_product() -> None:
    response = client.post(
        "/api/v1/cart/validate",
        json={"items": [{"product_id": 999, "quantity": 1}]},
    )
    assert response.status_code == 200
    assert response.json()["items"][0]["available"] is False
