import React, { useState } from "react";
import UsuariosTable from "./UsuariosTable";
import PersonalTable from "./PersonalTable";
import DireccionesTable from "./DireccionesTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("usuarios");

    const renderActiveSection = () => {
        switch (activeSection) {
            case "usuarios":
                return <UsuariosTable />;
            case "personal":
                return <PersonalTable />;
            case "direcciones":
                return <DireccionesTable />;
            default:
                return <UsuariosTable />;
        }
    };

    return (
        <div className="admin-dashboard">
            <header>
                <h1>Panel de Administración</h1>
            </header>
            <nav className="dashboard-nav">
                <button onClick={() => setActiveSection("usuarios")}>
                    Usuarios
                </button>
                <button onClick={() => setActiveSection("personal")}>
                    Personal
                </button>
                <button onClick={() => setActiveSection("direcciones")}>
                    Direcciones
                </button>
            </nav>
            <main>{renderActiveSection()}</main>
        </div>
    );
};

export default AdminDashboard;
