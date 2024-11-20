# authentication/serializers.py
from rest_framework import serializers
from .models import Personal, Usuario,Medico,Paciente,Direccion
import logging
logger = logging.getLogger(__name__)
def create(self, request, *args, **kwargs):
    logger.debug("Datos recibidos: %s", request.data)
    return super().create(request, *args, **kwargs)

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'  
class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)  # Campo adicional para capturar la contraseña

    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nom_usuario', 'password', 'id_personal', 'estado']

    def create(self, validated_data):
        # Extrae la contraseña y la elimina de los datos validados
        password = validated_data.pop('password', None)
        usuario = Usuario(**validated_data)
        if password:
            usuario.set_password(password)  # Usa el método `set_password` para hashear la contraseña
        usuario.save()
        return usuario
    
class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__' 
class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'
class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = '__all__'