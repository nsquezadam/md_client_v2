python carga_direccion.py
python carga_personal.py
python carga_usuario.py
python carga_sector.py
python carga_administrador.py
python carga_medico.py
python carga_paciente.py
python carga_medicamento.py
python carga_farmacia.py
python carga_especialidad.py
python carga_especialidad_medico.py
python carga_paciente_medico.py
python carga_historial_medico.py
python carga_observacion_historial.py
python carga_examen_historial.py
python carga_control_historial.py

python carga_receta_historial.py

python crear_usuarios.py

python manage.py shell

from authentication.models import Personal, Usuario, Sector, Medico, Paciente
print(Personal.objects.all())
print(Usuario.objects.all())
print(Sector.objects.all())
print(Medico.objects.all())
print(Paciente.objects.all())


python manage.py makemigrations
python manage.py migrate

curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "admin123"}' \
     -i

curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "fsuarez", "password": "fsuarez123"}' \
     -i

curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "fsotelo", "password": "fsotelo123"}' \
     -i

curl -X GET http://127.0.0.1:8000/api/auth/user-info/ \
     -H "Content-Type: application/json" \
     -H "Cookie: sessionid=7kfeag0af05728owxva5akdltc42yfof"


curl -X GET http://127.0.0.1:8000/api/auth/user-info/ \
     -H "Content-Type: application/json" \
     -H "Cookie: sessionid=tc8dsd5z6biiqcat9nivg3fwbalcn1r4"
     
     
     
############TEST COIMANDOS 

python manage.py test

python manage.py test authentication.tests.test_user_info
     

curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "admin123"}'

# Obtener información del usuario
curl -X GET http://127.0.0.1:8000/api/auth/user-info/ \
     -H "Content-Type: application/json" \
     -H "Cookie: sessionid=<session_value>"

# Obtener usuarios
curl -X GET http://127.0.0.1:8000/api/auth/usuario/ \
     -H "Content-Type: application/json" \
     -H "Cookie: sessionid=<session_value>"

     

curl -X GET http://127.0.0.1:8000/api/auth/usuario/ -H "Content-Type: application/json" -H "Cookie: sessionid=710dsz1k8hizelghgsli8rw8vvdm087h"

curl -X GET http://127.0.0.1:8000/api/auth/usuario/
curl -X GET http://127.0.0.1:8000/api/auth/personal/
curl -X GET http://127.0.0.1:8000/api/auth/direccion/

curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "admin123"}'
     curl -X GET http://127.0.0.1:8000/api/auth/usuario/


     curl -X GET http://127.0.0.1:8000/api/auth/obtener-datos-combinados/ \
     -H "Content-Type: application/json" \
     -H "Cookie: sessionid=lw8dymkldtu2rl9so1ifoqgb8lsnzid7"


from django.test import Client

client = Client()
response = client.get('/api/auth/obtener-datos-combinados/')
print(response.status_code)
print(response.json())


## CREAR USUARIO


curl -X POST http://127.0.0.1:8000/api/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "admin123"}' \
     -i

curl -X POST http://127.0.0.1:8000/api/auth/usuario/ \
-H "Content-Type: application/json" \
-H "Cookie: sessionid=Hqxhk6vpBdN9S2sxrVb6EkHK6Xu1ESXH ; csrftoken=04m3y744xi0rap0r9lcg6zyrjusv9d8a" \
-H "X-CSRFToken: 04m3y744xi0rap0r9lcg6zyrjusv9d8a" \
-d '{
  "nom_usuario": "mgonzalez",
  "password": "mgonzalez123",
  "id_personal": 14,
  "estado": "Activo",
  "is_active": true,
  "is_staff": false,
  "is_superuser": false
}'
curl -X GET http://127.0.0.1:8000/api/auth/usuario/ \
-H "Content-Type: application/json" \
-H "Cookie: sessionid=y2yeacm0rgn2z0rmxzzevqrowey0ckbu"

curl -X PUT http://127.0.0.1:8000/api/auth/usuario/9/ \
-H "Content-Type: application/json" \
-H "Cookie: sessionid=y2yeacm0rgn2z0rmxzzevqrowey0ckbu" \
-d '{
  "nom_usuario": "testUserD",
  "password": "testuserM",
  "id_personal":14 ,
  "estado": "Activo",
  "is_active": true,
  "is_staff": true,
  "is_superuser": true
}'


curl -X DELETE http://127.0.0.1:8000/api/auth/usuario/9/ \
-H "Content-Type: application/json" \
-H "Cookie: sessionid=y2yeacm0rgn2z0rmxzzevqrowey0ckbu"


curl -X POST http://127.0.0.1:8000/api/auth/direccion/ \
-H "Content-Type: application/json" \
-H "X-CSRFToken:6bh180uEJrLw4Q9P2lhhAaWCyy9se6DK" \
--cookie "csrftoken=6bh180uEJrLw4Q9P2lhhAaWCyy9se6DK; sessionid=qpnryo8suwk7pe96g444px33ik0u03oy" \
-d '{
    "nom_calle": "Principal",
    "num_calle": 123,
    "departamento":11,
    "comuna":"macul",
    "ciudad": "Santiago",
    "region": "metyropolitana"
}'
