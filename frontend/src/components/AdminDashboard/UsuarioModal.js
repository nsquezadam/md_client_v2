import React, { useState } from "react";
import "./UsuarioModal.css";

const UsuarioModal = ({ usuario, onSave, onClose, personalOptions }) => {
    const initialFormData = {
        nom_usuario: "",
        hk_contrasena: usuario?.id_usuario ? "" : "temp1234", // Contraseña temporal para nuevos usuarios
        id_personal: "",
        estado: "Activo",
        ...usuario,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llama la función para guardar los datos
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{formData.id_usuario ? "Editar Usuario" : "Crear Usuario"}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Nombre de Usuario</label>
                    <input
                        type="text"
                        name="nom_usuario"
                        value={formData.nom_usuario || ""}
                        onChange={handleChange}
                        required
                    />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="hk_contrasena"
                        value={formData.hk_contrasena || ""}
                        onChange={handleChange}
                        placeholder="Deja vacío para usar la contraseña existente"
                    />
                    <label>Personal</label>
                    <select
                        name="id_personal"
                        value={formData.id_personal || ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Selecciona un personal
                        </option>
                        {personalOptions.map((personal) => (
                            <option key={personal.id_personal} value={personal.id_personal}>
                                {`${personal.primer_nombre} ${personal.apellido_paterno}`}
                            </option>
                        ))}
                    </select>
                    <label>Estado</label>
                    <select
                        name="estado"
                        value={formData.estado || "Activo"}
                        onChange={handleChange}
                        required
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsuarioModal;
