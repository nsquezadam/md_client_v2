class PrintRequestHeadersMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(request.headers)  # Esto imprimirá los encabezados en la consola del servidor
        return self.get_response(request)
