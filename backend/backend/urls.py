"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.contrib import admin
from django.urls import path, include,re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from authentication import views
from django.views.generic.base import RedirectView


urlpatterns = [
    #path('', views.admin_dashboard, name='home'),  # Redirección a la página de inicio personalizada
    path('admin/', admin.site.urls),  # Panel de administración por defecto de Django
    path('api/auth/', include('authentication.urls')),  # Incluye las URLs de autenticación
    path('custom-admin/', views.admin_dashboard, name='admin_dashboard'),  # Panel personalizado
    path('', RedirectView.as_view(url='/admin/', permanent=True)), 
    #re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]