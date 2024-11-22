import React, { useState } from "react";
import "./PersonalModal.css"

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
                    <label>RUT</label>
                    <input
                        type="text"
                        name="rut_completo"
                        value={formData.rut_completo || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Primer Nombre</label>
                    <input
                        type="text"
                        name="primer_nombre"
                        value={formData.primer_nombre || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Segundo Nombre</label>
                    <input
                        type="text"
                        name="segundo_nombre"
                        value={formData.segundo_nombre || ""}
                        onChange={handleChange}
                    />
                    <label>Apellido Paterno</label>
                    <input
                        type="text"
                        name="apellido_paterno"
                        value={formData.apellido_paterno || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Apellido Materno</label>
                    <input
                        type="text"
                        name="apellido_materno"
                        value={formData.apellido_materno || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="fec_nacimiento"
                        value={formData.fec_nacimiento || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        name="correo_electronico"
                        value={formData.correo_electronico || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Fecha de Contratación</label>
                    <input
                        type="date"
                        name="fec_contratacion"
                        value={formData.fec_contratacion || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>ID Dirección</label>
                    <input
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
