import json
from django.http import JsonResponse, HttpResponse ,HttpResponseNotAllowed
from django.contrib.auth import authenticate, login,logout
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from rest_framework import viewsets,status
from .models import Personal, Usuario,Medico,Paciente,Direccion
from .serializers import PersonalSerializer ,UsuarioSerializer,MedicoSerializer, PacienteSerializer,DireccionSerializer
from django.utils.timezone import now
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response



import logging
logger = logging.getLogger(__name__)


@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    "success": True,
                    "message": "Login exitoso",
                    "user": {
                        "nombre": user.nom_usuario,
                        "is_admin": user.is_superuser,
                        "is_staff": user.is_staff,
                    }
                })
            else:
                return JsonResponse({"success": False, "message": "Credenciales inválidas"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Formato de datos inválido"}, status=400)

    return HttpResponseNotAllowed(["POST"], "Método no permitido")
def is_admin(user):
    return user.is_superuser
#
@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Usuario.objects.all()  # Admin ve todo
        elif user.is_staff:
            return Usuario.objects.filter(is_staff=False)  # Staff ve usuarios no staff
        return Usuario.objects.filter(id_usuario=user.id_usuario)  # Usuario regular solo ve sus datos

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    

class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = DireccionSerializer

@login_required
def protected_view(request):
    return JsonResponse({"message": "Vista protegida, usuario autenticado"})

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

@login_required
def user_info(request):
    try:
        user = request.user

        # Verifica que el usuario esté autenticado
        if not user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'Usuario no autenticado'}, status=401)

        # Devuelve información completa del usuario
        response_data = {
            "nombre": user.nom_usuario,
            "ultimo_login": user.last_login.strftime("%d %B %Y, %H:%M %p") if user.last_login else "No disponible",
            "is_admin": user.is_superuser,
            "is_staff": user.is_staff,
        }
        return JsonResponse(response_data, status=200)

    except Exception as e:
        # Registra el error en los logs
        logger.error(f"Error en user_info: {str(e)}", exc_info=True)
        return JsonResponse({'success': False, 'message': 'Error interno en el servidor'}, status=500)


@csrf_exempt
def user_logout(request):
    if request.method == 'POST':
        logout(request)  # Invalida la sesión del usuario
        return JsonResponse({'success': True, 'message': 'Sesión cerrada exitosamente'})
    return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)


#creacion de enpoit que mne traiga  informacion  para el  header  |


@login_required
def user_details(request):
    user = request.user
    
    # Verificar si el usuario tiene un perfil de médico
    try:
        personal = Personal.objects.get(id_personal=user.id_personal)
        is_medico = Medico.objects.filter(id_personal=personal.id_personal).exists()
        if is_medico:
            full_name = f"Dr. {personal.primer_nombre} {personal.apellido_paterno}"
        else:
            full_name = f"{personal.primer_nombre} {personal.apellido_paterno}"
    except Personal.DoesNotExist:
        full_name = "Nombre no disponible"

    # Preparar los datos de respuesta
    response_data = {
        "name": full_name,
        "last_login": user.last_login.strftime('%d %B %Y, %I:%M %p') if user.last_login else "No disponible",
        "current_date": now().strftime('%d %B %Y'),
    }
    return JsonResponse(response_data)


def usuario_list(request):
    usuarios = list(Usuario.objects.values())
    logger.debug(f"Usuarios recuperados: {usuarios}")
    return JsonResponse(usuarios, safe=False)

def personal_list(request):
    personal = list(Personal.objects.values())
    return JsonResponse(personal, safe=False)

def direccion_list(request):
    direcciones = list(Direccion.objects.values())
    return JsonResponse(direcciones, safe=False)

@api_view(['GET'])
def obtener_datos(request):
    usuarios = Usuario.objects.all()
    direcciones = Direccion.objects.all()
    
    usuarios_serializados = UsuarioSerializer(usuarios, many=True)
    direcciones_serializadas = DireccionSerializer(direcciones, many=True)
    return Response({
        'usuarios': usuarios_serializados.data,
        'direcciones': direcciones_serializadas.data,
    })
    
@login_required
@user_passes_test(lambda user: user.is_superuser)
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer



class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer

    def create(self, request, *args, **kwargs):
        logger.debug(f"Datos recibidos para crear Dirección: {request.data}")
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Error al crear Dirección: {e}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def obtener_datos_combinados(request):
    try:
        usuarios = Usuario.objects.all()
        personales = Personal.objects.all()
        direcciones = Direccion.objects.all()

        usuarios_serializados = UsuarioSerializer(usuarios, many=True).data
        personales_serializados = PersonalSerializer(personales, many=True).data
        direcciones_serializados = DireccionSerializer(direcciones, many=True).data

        return Response({
            'usuarios': usuarios_serializados,
            'personales': personales_serializados,
            'direcciones': direcciones_serializados,
        }, status=200)
    except Exception as e:
        logger.error(f"Error al obtener datos combinados: {e}", exc_info=True)
        return Response({"error": "Error al obtener los datos."}, status=500)


