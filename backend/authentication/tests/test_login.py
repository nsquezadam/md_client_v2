from django.test import TestCase, Client
from ..models import Usuario  # Importa el modelo Usuario personalizado
from django.db import connection



class LoginTestCase(TestCase):
    #Configuraciones
    def setUp(self):
        """Configura un usuario de prueba existente en la base de datos."""
        self.client = Client()
        # Crea un usuario de prueba con el nombre y contraseña correctos
        self.user = Usuario.objects.create_user(nom_usuario='admin')
        self.user.set_password('admin123')  # Establece la contraseña correctamente
        self.user.save()  # Guarda los cambios
    #Prueba de verificacion de  usuario 
    def test_login_with_existing_user(self):
        """Prueba de login con un usuario ya creado en la base de datos."""
        response = self.client.post('/api/login/', {'username': 'admin', 'password': 'admin123'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertTrue(response.json()['success'])
    #Coneccion a base de datos probando con tablas especificas    
    def test_db_connection(self):
        """Prueba de conexión a la base de datos."""
        try:
            # Realiza una consulta simple para verificar que la conexión a la base de datos está funcionando
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM Usuario;")
            db_connected = True
        except Exception as e:
            db_connected = False
            print("Error de conexión a la base de datos:", e)  # Imprime el error específico
        self.assertTrue(db_connected, "La conexión a la base de datos falló")
