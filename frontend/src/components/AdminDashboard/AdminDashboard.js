import React from "react";
import CrudTable from "./Crudtable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Panel Administrador</h1>
                <p>Gestión de Usuarios, Personal y Direcciones</p>
            </header>

            <section className="dashboard-section">
                <CrudTable
                    endpoint="usuario"
                    columns={["nom_usuario", "estado","hk_contrasena", "id_personal", "estado"]}
                    title="Usuarios"
                    idField="id_usuario"
                />
            </section>

            <section className="dashboard-section">
                <CrudTable
                    endpoint="personal"
                    columns={["rut_completo","primer_nombre","segundo_nombre", "apellido_paterno","apellido_materno","fec_nacimiento", "telefono","correo_electronico","fec_contratacion","id_direccion"]}
                    title="Personal"
                    idField="id_personal"
                />
            </section>

            <section className="dashboard-section">
                <CrudTable
                    endpoint="direccion"
                    columns={["nom_calle", "num_calle", "departamento", "comuna", "ciudad", "region"]}
                    title="Direcciones"
                    idField="id_direccion"
                />
            </section>
        </div>
    );
};

export default AdminDashboard;
