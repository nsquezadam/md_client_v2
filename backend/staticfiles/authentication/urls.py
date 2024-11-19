# authentication/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PersonalViewSet, 
    UsuarioViewSet, 
    MedicoViewSet, 
    PacienteViewSet, 
    DireccionViewSet,
    user_login,
    user_info,
    user_logout,
    user_details,
    usuario_list,
    personal_list,
    direccion_list,
    obtener_datos_combinados
    
)


import logging
logger = logging.getLogger(__name__)
# Configuración del router para las vistas de los modelos
router = DefaultRouter()
router.register(r'personal', PersonalViewSet, basename='personal')
router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'medico', MedicoViewSet, basename='medico')
router.register(r'paciente', PacienteViewSet, basename='paciente')
router.register(r'direccion', DireccionViewSet, basename='direccion')

# URL patterns
urlpatterns = [
    path('', include(router.urls)),       # Endpoints de las tablas
    path('login/', user_login, name='user_login'),  # Endpoint para login
    path('user-info/', user_info, name='user-info'), 
    path('logout/', user_logout, name='user_logout'), 
    path('user-details/', user_details, name='user_details'),
     path('usuario/', usuario_list, name='usuario-list'),
    path('personal/', personal_list, name='personal-list'),
    path('direccion/',direccion_list, name='direccion-list'),
     path('obtener-datos-combinados/', obtener_datos_combinados, name='obtener_datos_combinados'),
]
logger.debug(f"Rutas cargadas: {urlpatterns}")