import React, { useState } from "react";
import "./PersonalModal.css";

const PersonalModal = ({ personal, onSave, onClose }) => {
    const initialFormData = {
        rut_completo: "",
        primer_nombre: "",
        segundo_nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        fec_nacimiento: "",
        telefono: "",
        correo_electronico: "",
        fec_contratacion: "",
        id_direccion: "",
        ...personal, // Sobrescribe con los valores existentes si los hay
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llama a la función para guardar
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{formData.id_personal ? "Editar Personal" : "Crear Personal"}</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="rut_completo">RUT</label>
                    <input
                        id="rut_completo"
                        type="text"
                        name="rut_completo"
                        value={formData.rut_completo || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="primer_nombre">Primer Nombre</label>
                    <input
                        id="primer_nombre"
                        type="text"
                        name="primer_nombre"
                        value={formData.primer_nombre || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="segundo_nombre">Segundo Nombre</label>
                    <input
                        id="segundo_nombre"
                        type="text"
                        name="segundo_nombre"
                        value={formData.segundo_nombre || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="apellido_paterno">Apellido Paterno</label>
                    <input
                        id="apellido_paterno"
                        type="text"
                        name="apellido_paterno"
                        value={formData.apellido_paterno || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="apellido_materno">Apellido Materno</label>
                    <input
                        id="apellido_materno"
                        type="text"
                        name="apellido_materno"
                        value={formData.apellido_materno || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="fec_nacimiento">Fecha de Nacimiento</label>
                    <input
                        id="fec_nacimiento"
                        type="date"
                        name="fec_nacimiento"
                        value={formData.fec_nacimiento || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        id="telefono"
                        type="text"
                        name="telefono"
                        value={formData.telefono || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="correo_electronico">Correo Electrónico</label>
                    <input
                        id="correo_electronico"
                        type="email"
                        name="correo_electronico"
                        value={formData.correo_electronico || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="fec_contratacion">Fecha de Contratación</label>
                    <input
                        id="fec_contratacion"
                        type="date"
                        name="fec_contratacion"
                        value={formData.fec_contratacion || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="id_direccion">ID Dirección</label>
                    <input
                        id="id_direccion"
                        type="text"
                        name="id_direccion"
                        value={formData.id_direccion || ""}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalModal;
