import React, { useState } from "react";
import "./EditModal.css"

const EditModal = ({ direccion, onSave, onClose }) => {
    const initialFormData = {
        nom_calle: "",
        num_calle: "",
        departamento: "",
        comuna: "",
        ciudad: "",
        region: "",
        ...direccion, // Esto sobrescribirá los valores predeterminados si existen en `direccion`
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llama a `handleSaveEdit` o `handleCreate` en el componente principal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{formData.id_direccion ? "Editar Dirección" : "Crear Dirección"}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Calle</label>
                    <input
                        type="text"
                        name="nom_calle"
                        value={formData.nom_calle || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Número</label>
                    <input
                        type="text"
                        name="num_calle"
                        value={formData.num_calle || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Departamento</label>
                    <input
                        type="text"
                        name="departamento"
                        value={formData.departamento || ""}
                        onChange={handleChange}
                    />
                    <label>Comuna</label>
                    <input
                        type="text"
                        name="comuna"
                        value={formData.comuna || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad || ""}
                        onChange={handleChange}
                    />
                    <label>Región</label>
                    <input
                        type="text"
                        name="region"
                        value={formData.region || ""}
                        onChange={handleChange}
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

export default EditModal;
