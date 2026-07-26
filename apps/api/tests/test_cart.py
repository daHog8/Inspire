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
    assert payload["subtotal"] == 178.0
    assert payload["shipping"] == 0
    assert payload["total"] == 178.0


def test_validate_unknown_product() -> None:
    response = client.post(
        "/api/v1/cart/validate",
        json={"items": [{"product_id": 999, "quantity": 1}]},
    )
    assert response.status_code == 200
    assert response.json()["items"][0]["available"] is False
