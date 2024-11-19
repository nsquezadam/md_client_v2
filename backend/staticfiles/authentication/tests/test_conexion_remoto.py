import psycopg2
from psycopg2 import sql

try:
    connection = psycopg2.connect(
        dbname="md_client",
        user="md_client_user",
        password="0abIMkcFqHrffluP11jd0cOaMOVNXXdA",
        host="dpg-cssmeed2ng1s73amo48g-a.oregon-postgres.render.com",
        port="5432",
    )
    print("Conexión exitosa a la base de datos")
except Exception as e:
    print("Error al conectar a la base de datos:", e)
1