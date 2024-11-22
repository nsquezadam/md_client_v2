import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login } from "../../services/authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await login(username, password);

            // Guarda información en localStorage
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem(
                "userRole",
                data.user.is_admin ? "admin" : data.user.is_staff ? "staff" : "user"
            );

            // Redirección basada en el rol del usuario
            if (data.user.is_admin) {
                navigate("/admin-dashboard");
            } else if (data.user.is_staff) {
                navigate("/staff-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        } catch (err) {
            setError(err.message || "Credenciales inválidas. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const isButtonActive = username.trim() && password.trim();

    return (
        <div className="container-login">
            <div className="logo">
                <img
                    src={logo}
                    alt="Logo del proyecto"
                    style={{ width: "350px", height: "auto" }}
                />
            </div>
            <h2>Iniciar Sesión</h2>
            <div className="container-form">
                {error && (
                    <p className="error-message" role="alert">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-label="Usuario"
                        disabled={loading}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Contraseña"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className={isButtonActive ? "active" : "inactive"}
                        disabled={!isButtonActive || loading}
                        aria-busy={loading}
                    >
                        {loading ? "Cargando..." : "INGRESAR"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
