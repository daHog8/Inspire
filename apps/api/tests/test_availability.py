def test_catalogue_exposes_catalogue_metadata(client):
    response = client.get("/api/v1/products?page_size=60")
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 1
    product = payload["items"][0]
    assert product["slug"] == "eclat-solaire"
    assert product["reference_code"] == "OLF-001"
    assert product["product_type"] == "travel-spray"


def test_product_availability_exposes_france_and_gabon(client):
    response = client.get("/api/v1/products/eclat-solaire/availability")
    assert response.status_code == 200
    payload = response.json()
    assert payload["selected_source"] == "GABON"
    assert {item["location_code"] for item in payload["options"]} == {
        "GABON",
        "FRANCE",
    }
