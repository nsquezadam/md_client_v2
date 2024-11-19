from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from authentication import views

urlpatterns = [
    # Panel de administración de Django
    path('admin/', admin.site.urls),
    
    # API de autenticación
    path('api/auth/', include('authentication.urls')),

    # Rutas no manejadas -> React frontend (index.html)
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
