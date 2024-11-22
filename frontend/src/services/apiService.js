const API_BASE_URL = "http://127.0.0.1:8000/api/auth/";

// Función para obtener el token CSRF de las cookies
const getCSRFToken = () => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];
};

// Función para manejar solicitudes GET
export const fetchData = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
    }
    return response.json();
};

// Función para manejar solicitudes POST
export const createData = async (endpoint, data) => {
    const csrfToken = getCSRFToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error al crear datos: ${response.status}`);
    }
    return response.json();
};

// Función para manejar solicitudes PUT
export const updateData = async (endpoint, id, data) => {
    const csrfToken = getCSRFToken();
    console.log("CSRF Token:", csrfToken);
    console.log(`PUT Request URL: ${API_BASE_URL}${endpoint}${id}/`);
    console.log("PUT Request Data:", JSON.stringify(data));
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error al actualizar datos: ${response.status}`);
    }
    return response.json();
};

// Función para manejar solicitudes DELETE
export const deleteData = async (endpoint, id) => {
    const csrfToken = getCSRFToken();
    console.log("CSRF Token:", csrfToken);
    console.log(`DELETE Request URL: ${API_BASE_URL}${endpoint}/${id}/`);

    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}/`, {
        method: "DELETE",
        headers: {
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({})); // Manejo seguro
        console.error("Error details:", errorDetails);
        throw new Error(`Error al eliminar datos: ${response.status} - ${errorDetails.detail || "Sin detalles"}`);
    }

    // Verifica si hay contenido para devolver
    if (response.status !== 204) {
        return response.json().catch(() => ({})); // Manejo seguro si no hay contenido JSON
    }

    return { success: true }; // Respuesta por defecto para DELETE exitoso
};
