import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import { logout } from "../../services/authService";

const Header = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/"); // Redirige al login después de cerrar sesión
        } catch (error) {
            setError("Error al cerrar sesión. Intenta nuevamente.");
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <img src={logo} alt="Logo" className="header-logo" />
                <div className="header-text">
                    <h2>Bienvenido</h2>
                </div>
            </div>
            <div className="header-right">
                <p>Hora actual: {time}</p>
                {error && <p className="error-message">{error}</p>}
                <button className="logout-button" onClick={handleLogout}>
                    SALIR
                </button>
            </div>
        </header>
    );
};

export default Header;
