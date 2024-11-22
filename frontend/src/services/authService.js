const API_URL = process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/api/auth/`
    : "http://127.0.0.1:8000/api/auth/";



// Servicio de inicio de sesión
export const login = async (username, password) => {
    const response = await fetch(`${API_URL}login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Asegura que las cookies se gestionen correctamente
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error de autenticación");
    }

    return response.json(); // Devuelve toda la respuesta JSON
};

// Servicio para cerrar sesión
export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Asegura que las cookies de sesión se envíen correctamente
        });

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

        const data = await response.json();
        return data; // Devuelve el estado del cierre de sesión
    } catch (error) {
        console.error("Error en el cierre de sesión:", error.message || error);
        throw error;
    }
};

