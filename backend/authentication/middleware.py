from django.middleware.csrf import get_token
from django.utils.deprecation import MiddlewareMixin

class EnsureCSRFMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response