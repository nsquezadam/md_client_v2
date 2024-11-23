import React, { useState } from "react";
import "./UserDetailsForm.css";

const UserDetailsForm = () => {
    const [formData, setFormData] = useState({
        nombre: "Juan Emilio Pérez Soto",
        edad: "34 y 6 meses",
        direccion: "Santa Isabel 1100",
        comuna: "Providencia",
        ciudad: "Providencia",
        region: "Providencia",
        licencia: "2028/04/01",
        especialidades: "Medicina General, Cardiología",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos guardados:", formData);
        // Aquí puedes agregar la lógica para guardar los datos
    };

    return (
        <form className="user-details-form" onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} readOnly />

            <label>Edad</label>
            <input type="text" name="edad" value={formData.edad} readOnly />

            <label>Dirección</label>
            <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
            />

            <label>Comuna</label>
            <input
                type="text"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
            />

            <label>Ciudad</label>
            <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
            />

            <label>Región</label>
            <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
            />

            <label>Licencia</label>
            <input
                type="text"
                name="licencia"
                value={formData.licencia}
                onChange={handleChange}
            />

            <label>Especialidades</label>
            <input
                type="text"
                name="especialidades"
                value={formData.especialidades}
                readOnly
            />

            <button type="submit" className="save-button">
                GUARDAR CAMBIOS
            </button>
        </form>
    );
};

export default UserDetailsForm;
