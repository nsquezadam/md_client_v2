from django.contrib import admin
from .models import Direccion, Personal, Usuario, Sector, Administrador, Medico, Paciente, Medicamento, Farmacia, Especialidad, EspecialidadMedico, PacienteMedico, HistorialMedico, ObservacionHistorial, ExamenHistorial, ControlHistorial, RecetaHistorial, RecetaMedicamento

# Registrar cada modelo en el admin
admin.site.register(Direccion)
admin.site.register(Personal)
admin.site.register(Usuario)
admin.site.register(Sector)
admin.site.register(Administrador)
admin.site.register(Medico)
admin.site.register(Paciente)
admin.site.register(Medicamento)
admin.site.register(Farmacia)
admin.site.register(Especialidad)
admin.site.register(EspecialidadMedico)
admin.site.register(PacienteMedico)
admin.site.register(HistorialMedico)
admin.site.register(ObservacionHistorial)
admin.site.register(ExamenHistorial)
admin.site.register(ControlHistorial)
admin.site.register(RecetaHistorial)
admin.site.register(RecetaMedicamento)
