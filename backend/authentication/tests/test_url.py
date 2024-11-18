from django.test import TestCase
from django.urls import reverse, resolve

class UrlsTestCase(TestCase):
    def test_urls(self):
        # URLs a probar
        urls = [
            {'url': '/api/auth/user-info/', 'expected_status': 401},  # Usuario no autenticado
            {'url': '/api/auth/login/', 'expected_status': 200},     # Página de login
        ]
        
        for url in urls:
            response = self.client.get(url['url'])
            self.assertEqual(
                response.status_code,
                url['expected_status'],
                f"Fallo en {url['url']}, se esperaba {url['expected_status']} pero devolvió {response.status_code}"
            )
