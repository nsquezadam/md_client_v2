from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password, check_password


class UsuarioManager(BaseUserManager):
    def create_user(self, nom_usuario, password=None, **extra_fields):
        if not nom_usuario:
            raise ValueError('El nombre de usuario es obligatorio.')

        # Crea un usuario con los campos proporcionados
        user = self.model(nom_usuario=nom_usuario, **extra_fields)
        user.set_password(password)  # Encripta la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, nom_usuario, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(nom_usuario, password, **extra_fields)



class Usuario(AbstractBaseUser, PermissionsMixin):
    id_usuario = models.AutoField(primary_key=True)
    nom_usuario = models.CharField(max_length=50, unique=True)
    hk_contrasena = models.CharField(max_length=128)
    id_personal = models.ForeignKey('Personal', on_delete=models.CASCADE, null=True, blank=True)  # Relación correcta

    estado = models.CharField(max_length=8, choices=[('Activo', 'Activo'), ('Inactivo', 'Inactivo')], default='Activo')

    # Campos auxiliares (no necesarios si los datos están en `Personal`)
    # Corrige las propiedades para usar id_personal
    first_name = property(lambda self: self.id_personal.primer_nombre if self.id_personal else "")
    last_name = property(lambda self: self.id_personal.apellido_paterno if self.id_personal else "")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'nom_usuario'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.nom_usuario




class Direccion(models.Model):
    id_direccion = models.AutoField(primary_key=True)
    nom_calle = models.CharField(max_length=30)
    num_calle = models.CharField(max_length=30)
    departamento = models.CharField(max_length=4, blank=True)
    comuna = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=50)
    region = models.CharField(max_length=20)

class Personal(models.Model):
    id_personal = models.AutoField(primary_key=True)
    rut_completo = models.CharField(max_length=50, unique=True)
    primer_nombre = models.CharField(max_length=50)
    segundo_nombre = models.CharField(max_length=50, blank=True)
    apellido_paterno = models.CharField(max_length=50)
    apellido_materno = models.CharField(max_length=50)
    fec_nacimiento = models.DateField()
    telefono = models.CharField(max_length=9)
    correo_electronico = models.EmailField(max_length=30)
    fec_contratacion = models.DateField()
    id_direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)

class Administrador(models.Model):
    id_administrador = models.AutoField(primary_key=True)
    id_sector = models.IntegerField()
    nom_cargo = models.CharField(max_length=50)
    id_personal = models.ForeignKey(Personal, on_delete=models.CASCADE)

class Sector(models.Model):
    id_sector = models.AutoField(primary_key=True)
    nom_sector = models.CharField(max_length=50)

class Medico(models.Model):
    id_medico = models.AutoField(primary_key=True)
    licencia = models.IntegerField()
    vigencia_licencia = models.DateField()
    id_sector = models.ForeignKey(Sector, on_delete=models.CASCADE)
    id_personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    nom_cargo = models.CharField(max_length=50)

class Paciente(models.Model):
    id_paciente = models.AutoField(primary_key=True)
    rut_completo = models.CharField(max_length=50, unique=True)
    primer_nombre = models.CharField(max_length=50)
    segundo_nombre = models.CharField(max_length=50, blank=True)
    apellido_paterno = models.CharField(max_length=50)
    apellido_materno = models.CharField(max_length=50)
    fec_nacimiento = models.DateField()
    id_direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=9)
    correo_electronico = models.EmailField(max_length=30)
    id_medico = models.ForeignKey(Medico, on_delete=models.CASCADE)

class Medicamento(models.Model):
    id_medicamento = models.AutoField(primary_key=True)
    nombre_medicamento = models.CharField(max_length=20)
    stock = models.IntegerField()
    fecha_abastecimiento = models.DateField()

class Farmacia(models.Model):
    id_farmacia = models.AutoField(primary_key=True)
    id_medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)

class Especialidad(models.Model):
    id_especialidad = models.AutoField(primary_key=True)
    nom_especialidad = models.CharField(max_length=50)
    fec_creacion = models.DateField()

class EspecialidadMedico(models.Model):
    id_medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('id_medico', 'id_especialidad')

class PacienteMedico(models.Model):
    id_medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    id_paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('id_medico', 'id_paciente')

class HistorialMedico(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    fec_ult_actualizacion = models.DateField()
    fec_creacion = models.DateField()

class ObservacionHistorial(models.Model):
    id_observacion_his = models.AutoField(primary_key=True)
    id_historial = models.ForeignKey(HistorialMedico, on_delete=models.CASCADE)
    fec_creacion = models.DateField()
    detalle = models.TextField()
    diagnostico_medico = models.TextField()

class ExamenHistorial(models.Model):
    id_exa_his = models.AutoField(primary_key=True)
    id_historial = models.ForeignKey(HistorialMedico, on_delete=models.CASCADE)
    fec_creacion = models.DateField()
    nom_examen = models.CharField(max_length=50)
    estado = models.CharField(max_length=10, choices=[('Pendiente', 'Pendiente'), ('Entregado', 'Entregado')])
    resultados = models.TextField()

class ControlHistorial(models.Model):
    id_control_his = models.AutoField(primary_key=True)
    id_historial = models.ForeignKey(HistorialMedico, on_delete=models.CASCADE)
    fec_control = models.DateTimeField()
    estado_control = models.CharField(max_length=10, choices=[('Completado', 'Completado'), ('Pendiente', 'Pendiente')])


class RecetaHistorial(models.Model):
    folio = models.AutoField(primary_key=True)
    id_historial = models.ForeignKey(HistorialMedico, on_delete=models.CASCADE)
    fec_creacion = models.DateField()
    dispensacion_meses = models.IntegerField()
    indicacion = models.TextField()
    cant_prescrita = models.IntegerField()
    cant_entregada = models.IntegerField()
    estado_gral = models.CharField(max_length=10, choices=[('Pendiente', 'Pendiente'), ('Entregado', 'Entregado')])

class RecetaMedicamento(models.Model):
    receta = models.ForeignKey(RecetaHistorial, on_delete=models.CASCADE, related_name="medicamentos")
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)
    indicacion = models.TextField()
    cant_prescrita = models.IntegerField()
