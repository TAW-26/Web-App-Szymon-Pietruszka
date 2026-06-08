from locust import HttpUser, task, between

class MovieCheckLoadTest(HttpUser):
    wait_time = between(1, 3)

    @task
    def test_homepage_api(self):
        self.client.get("/api/")

    @task
    def test_login_page(self):
        self.client.get("/")