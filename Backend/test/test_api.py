import httpx

BASE_URL = "http://localhost:8000"
JWT = ''
nickname = ""
password = ""


def test_read_title():
    # Arrange
    url = f"{BASE_URL}/"
    expected_title = "MovieCheck"

    # Act
    response = httpx.get(url)

    # Assert
    assert response.json()["title"] == expected_title


def test_login():
    global JWT
    url = f"{BASE_URL}/login"
    payload = {
        "nickname": nickname,
        "password": password
    }

    # Act
    response = httpx.post(url, json=payload)
    data = response.json()

    # Load JWT for other tests
    JWT = data["access_token"]

    # Assert
    assert response.status_code == 200


def test_get_me_with_JWT():
    # Arrange
    url = f"{BASE_URL}/user/me"
    headers = {"Authorization": f"Bearer {JWT}"}

    # Act
    response = httpx.get(url, headers=headers)
    data = response.json()

    # Assert
    assert response.status_code == 200
    assert data["nickname"] == nickname

def test_get_me_with_wrong_JWT():
    # Arrange
    url = f"{BASE_URL}/user/me"
    JWT_WRONG = 'qwerty'
    headers = {"Authorization": f"Bearer {JWT_WRONG}"}

    # Act
    response = httpx.get(url, headers=headers)

    # Assert
    assert response.status_code == 401

def test_delete_favorite_with_wrong_JWT():
    # Arrange
    url = f"{BASE_URL}/favorite/delete/1"
    JWT_WRONG = 'qwerty'
    headers = {"Authorization": f"Bearer {JWT_WRONG}"}

    # Act
    response = httpx.delete(url, headers=headers)

    # Assert
    assert response.status_code == 401

def test_get_favorites():
    # Arrange
    url = f"{BASE_URL}/favorites/user"
    headers = {"Authorization": f"Bearer {JWT}"}

    # Act
    response = httpx.get(url, headers=headers)

    # Assert
    assert response.status_code == 200

def test_post_rating_two_times():
    # Arrange
    url = f"{BASE_URL}/rating"
    headers = {"Authorization": f"Bearer {JWT}"}
    payload = {
        "id_movie": 1,
        "rating": 9
    }

    # Act
    first_response = httpx.post(url, json=payload, headers=headers)

    # Assert - jeśli nie wystawiono wcześniej
    assert first_response.status_code == 201

    # Act
    second_response = httpx.post(url, json=payload, headers=headers)

    # Assert
    assert second_response.status_code == 409
    assert second_response.json()["detail"] == "This user already set rate for this movie"