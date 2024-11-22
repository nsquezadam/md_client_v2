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
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.middleware.csrf import get_token

import logging
logger = logging.getLogger(__name__)


from django.middleware.csrf import get_token
from django.http import JsonResponse

def generate_csrf(request):
    token = get_token(request)
    response = JsonResponse({"csrftoken": token})
    response.set_cookie(
        "csrftoken",
        token,
        httponly=False,  # Para permitir acceso desde JavaScript
        samesite="Lax",
    )
    return response
@csrf_exempt
@api_view(['POST'])
def user_login(request):
    if request.method == "POST":
        # Registrar cookies y headers relacionados con CSRF para depuración
        print("CSRF Cookie:", request.COOKIES.get("csrftoken"))
        print("CSRF Header:", request.headers.get("X-CSRFToken"))

        try:
            # Parsear el cuerpo de la solicitud
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            # Autenticar usuario
            user = authenticate(request, username=username, password=password)

            if user is not None:
                # Iniciar sesión del usuario
                login(request, user)

                # Regenerar CSRF Token después del inicio de sesión
                csrf_token = get_token(request)

                return JsonResponse({
                    "success": True,
                    "message": "Login exitoso",
                    "csrftoken": csrf_token,
                    "user": {
                        "nombre": user.nom_usuario,
                        "is_admin": user.is_superuser,
                        "is_staff": user.is_staff,
                    }
                }, status=200)
            else:
                return JsonResponse({
                    "success": False,
                    "message": "Credenciales inválidas"
                }, status=401)

        except json.JSONDecodeError:
            return JsonResponse({
                "success": False,
                "message": "Formato de datos inválido"
            }, status=400)

    return JsonResponse({
        "success": False,
        "message": "Método no permitido"
    }, status=405)


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
    http_method_names = ['get', 'post', 'put', 'delete']  
    permission_classes = [IsAuthenticated] 

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer




class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer
    permission_classes = [IsAuthenticated]



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





@csrf_protect
def crear_direccion(request):
    if request.method == 'POST':
        print("CSRF Cookie:", request.COOKIES.get('csrftoken'))  # Verifica la cookie
        print("CSRF Header:", request.headers.get('X-CSRFToken'))  # Verifica el encabezado
        print("CSRF Token Middleware:", get_token(request))  # Token generador por middleware

        # Aquí va tu lógica para procesar la solicitud
        return JsonResponse({"message": "Dirección creada exitosamente"})
    return JsonResponse({"error": "Método no permitido"}, status=405)



def debug_csrf(request):
    print("CSRF Cookie:", request.COOKIES.get("csrftoken"))
    print("CSRF Header:", request.headers.get("X-CSRFToken"))
    token = get_token(request)  # Genera o recupera el token CSRF
    print("CSRF Token (from get_token):", token)
    return JsonResponse({"csrftoken": token})


def logout_view(request):
    # Lógica para manejar el cierre de sesión
    ...
    response = JsonResponse({"message": "Logged out successfully"})
    response.delete_cookie("csrftoken")  # Elimina la cookie CSRF
    return response
