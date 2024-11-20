const API_URL = process.env.REACT_APP_BACKEND_URL + "/api/auth/"; 

// Función para agregar un timeout
const withTimeout = (promise, ms) => {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), ms)
    );
    return Promise.race([promise, timeout]);
};


// // Servicio de inicio de sesión
// export const login = async (username, password) => {
//     const response = await fetch(`${API_URL}login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // Asegura que las cookies se gestionen correctamente
//         body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Error de autenticación");
//     }

//     return response.json(); // Devuelve toda la respuesta JSON
// };



// Función para configurar headers
const getHeaders = () => ({
    "Content-Type": "application/json",
});

// Servicio de inicio de sesión
export const login = async (username, password) => {
    try {
        const response = await withTimeout(
            fetch(`${API_URL}login/`, {
                method: "POST",
                headers: getHeaders(),
                credentials: "include",
                body: JSON.stringify({ username, password }),
            }),
            5000 // Timeout de 5 segundos
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error de autenticación");
        }

        return response.json();
    } catch (error) {
        console.error("Error en login:", error.message || error);
        throw error;
    }
};

// Servicio para cerrar sesión
export const logout = async () => {
    try {
        const response = await withTimeout(
            fetch(`${API_URL}logout/`, {
                method: "POST",
                headers: getHeaders(),
                credentials: "include",
            }),
            5000
        );

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

        return response.json();
    } catch (error) {
        console.error("Error en logout:", error.message || error);
        throw error;
    }
};
