import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ direccion, onSave, onClose }) => {
    const initialFormData = {
        nom_calle: "",
        num_calle: "",
        departamento: "",
        comuna: "",
        ciudad: "",
        region: "",
        ...direccion, // Sobrescribe con los valores existentes si los hay
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llama la función para guardar
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{formData.id_direccion ? "Editar Dirección" : "Crear Dirección"}</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nom_calle">Calle</label>
                    <input
                        id="nom_calle"
                        type="text"
                        name="nom_calle"
                        value={formData.nom_calle || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="num_calle">Número</label>
                    <input
                        id="num_calle"
                        type="text"
                        name="num_calle"
                        value={formData.num_calle || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="departamento">Departamento</label>
                    <input
                        id="departamento"
                        type="text"
                        name="departamento"
                        value={formData.departamento || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="comuna">Comuna</label>
                    <input
                        id="comuna"
                        type="text"
                        name="comuna"
                        value={formData.comuna || ""}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                        id="ciudad"
                        type="text"
                        name="ciudad"
                        value={formData.ciudad || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="region">Región</label>
                    <input
                        id="region"
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
