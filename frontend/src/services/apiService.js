const API_BASE_URL = process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/api/auth/`
    : "http://127.0.0.1:8000/api/auth/";

// Obtener el token CSRF de las cookies
export const getCSRFToken = () => {
    const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : null;
};


// Actualizar el token CSRF
export const refreshCSRFToken = async () => {
        
    try {
        const response = await fetch(`${API_BASE_URL}generate-csrf/`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`Error al refrescar CSRF: ${response.status}`);
        }
        console.log("CSRF token actualizado.");
    } catch (error) {
        console.error("Error al actualizar el token CSRF:", error);
        throw error;
    }
};

// Manejo de errores
const handleErrors = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error del servidor:", errorData);
        throw new Error(
            `HTTP Error: ${response.status} - ${errorData.detail || "Sin detalles"}`
        );
    }
    return response.json();
};

// GET
export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}/`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",

             },
            credentials: "include",
        });
        return await handleErrors(response);
    } catch (error) {
        console.error("FetchData Error:", error);
        throw error;
    }
};

// POST
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
    return handleErrors(response);
};
// PUT
export const updateData = async (endpoint, id, data) => {
    const csrfToken = getCSRFToken();
    console.debug("CSRF Token:", csrfToken);
    console.debug(`PUT Request URL: ${API_BASE_URL}${endpoint}/${id}/`);
    console.debug("PUT Request Data:", JSON.stringify(data));
    
    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleErrors(response);
};

// DELETE
// Función para manejar solicitudes DELETE
export const deleteData = async (endpoint, id) => {
    const csrfToken = getCSRFToken();
    console.debug("CSRF Token:", csrfToken);
    console.debug(`DELETE Request URL: ${API_BASE_URL}${endpoint}/${id}/`);

    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}/`, {
        method: "DELETE",

    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({}));
        console.error("Error details:", errorDetails);
        throw new Error(`Error al eliminar datos: ${response.status} - ${errorDetails.detail || "Sin detalles"}`);
    }

    // Manejo de respuesta para DELETE exitoso
    return response.status === 204 ? { success: true } : await response.json().catch(() => ({}));}