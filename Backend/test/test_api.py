import httpx

BASE_URL = "http://localhost:8000"
JWT = ''


def test_read_title():
    # Arrange
    url = f"{BASE_URL}/"
    expected_title = "MovieCheck"

    # Act
    response = httpx.get(url)

    # Assert
    assert response.json()["title"] == expected_title

def test_login():
    # Arrange
    url = f"{BASE_URL}/login"
    payload = {
        "nickname": "szymon",
        "password": "szymon"
    }

    # Act
    response = httpx.post(url, json=payload)
    data = response.json()

    # Load JWT for other tests
    JWT = data["access_token"]

    # Assert
    assert response.status_code == 200