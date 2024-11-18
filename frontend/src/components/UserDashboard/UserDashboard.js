import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import { fetchData } from "../../services/apiService";

const Usuario = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userInfo = await fetchData("http://127.0.0.1:8000/api/auth/usuario/");
                console.log("Usuario autenticado:", userInfo);
                // Maneja la información del usuario si es necesario
            } catch (error) {
                console.error("Usuario no autenticado:", error.message);
                alert("Por favor, inicia sesión.");
                navigate("/"); // Redirige al login
            }
        };
    
        checkAuth();
    }, [navigate]);
    return (
        <div className="Usuario">
            <h1>Usuario Component</h1>
        </div>
    );
};

export default Usuario;
