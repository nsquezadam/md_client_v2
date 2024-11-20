const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + "/api/auth";

// Función para obtener el token CSRF de las cookies
const getCSRFToken = () => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];
};

const handleErrors = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server Error:", errorData);
        throw new Error(`HTTP Error: ${response.status} - ${errorData.detail || "Sin detalles"}`);
    }
    return response.json();
};


// Función para manejar solicitudes GET
export const fetchData = async (endpoint) => {
    try {
        console.debug(`Fetching data from: ${API_BASE_URL}${endpoint}/`);
        const response = await fetch(`${API_BASE_URL}${endpoint}/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        
        if (!response.ok) {
            console.error(`Error al obtener datos: ${response.status}`);
            throw new Error(`Error al obtener datos: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("FetchData Error:", error);
        throw error; // Mantener el error para que se maneje adecuadamente
    }
    
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
    return handleErrors(response);
};

// Función para manejar solicitudes PUT
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


// Función para manejar solicitudes DELETE
export const deleteData = async (endpoint, id) => {
    const csrfToken = getCSRFToken();
    console.debug("CSRF Token:", csrfToken);
    console.debug(`DELETE Request URL: ${API_BASE_URL}${endpoint}/${id}/`);

    const response = await fetch(`${API_BASE_URL}${endpoint}/${id}/`, {
        method: "DELETE",
        headers: {
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({}));
        console.error("Error details:", errorDetails);
        throw new Error(`Error al eliminar datos: ${response.status} - ${errorDetails.detail || "Sin detalles"}`);
    }

    // Manejo de respuesta para DELETE exitoso
    return response.status === 204 ? { success: true } : await response.json().catch(() => ({}));
};

