import httpx

BASE_URL = "http://localhost:8000"


def test_read_root_title():
    # Arrange
    url = f"{BASE_URL}/"
    expected_title = "MovieCheck"

    # Act
    response = httpx.get(url)

    # Assert
    assert response.json()["title"] == expected_title