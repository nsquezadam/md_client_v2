from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.middleware.csrf import get_token

@receiver(user_logged_in)
def regenerate_csrf_on_login(sender, request, **kwargs):
       get_token(request)

@receiver(user_logged_out)
def regenerate_csrf_on_logout(sender, request, **kwargs):
       get_token(request)
