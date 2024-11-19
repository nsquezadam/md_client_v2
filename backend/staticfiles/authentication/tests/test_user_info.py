from django.test import TestCase
from django.urls import reverse
from ..models import Usuario

class UserInfoTestCase(TestCase):
    def setUp(self):
        self.user = Usuario.objects.create_user(
            nom_usuario="testuser1",
            password="testuser123_1",
            is_staff=True
        )
        self.client.login(username="testuser1", password="testuser123_1")

    def test_user_info_authenticated(self):
        response = self.client.get(reverse('user-info'))
        self.assertEqual(response.status_code, 200)

    def test_user_info_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse('user-info'))
        self.assertEqual(response.status_code, 401)
