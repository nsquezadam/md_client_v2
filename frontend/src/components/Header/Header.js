import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../../assets/blanco_logo.png';


const Header = () => {
        const navigate = useNavigate();
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(interval);
    }, []);


    // Carga la información del usuario usando datos simulados
        // Cerrar sesión
    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/logout/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                navigate("/"); // Redirige al login
            } else {
                console.error("Error al cerrar sesión");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    // Mostrar mensaje mientras se cargan los datos simulados
    
    return (
        <header className="header-container">
            {/* <div className="header-content"> */}
                <div className="header-left">
                    <img src={logo} alt="Logo" className="header-logo" />
                    <div className="header-text">
                        <h2>Bienvenido</h2>
                        
                    </div>
                </div>
                <div className="header-right">
                    <p>Hora actual: {time}</p>
                    <button className="logout-button" onClick={handleLogout}>
                        SALIR
                    </button>
                </div>
            {/* </div> */}
        </header>
    );
};

export default Header;
