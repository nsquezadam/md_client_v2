import React, { useState } from "react";
import Crudtable from "./Crudtable";
import { createData } from "../../services/apiService";
import ModalForm from "./ModalForm";

const UsuariosTable = () => {
    const [showModal, setShowModal] = useState(false);

    const columns = ["nom_usuario","hk_contrasena","id_personal_id","estado"];
    const columnLabels = {
        nom_usuario: "Nombre de Usuario",
        hk_contraseña:"Contraseña",
        id_personal_id :"Id Personal",
        estado: "Estado"
    };

    const handleCreate = async (formData) => {
        try {
            await createData("/usuario", formData);
            setShowModal(false);
            alert("Usuario creado con éxito");
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert("Error al crear usuario");
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Crear Usuario</button>
            <Crudtable
                endpoint="/usuario"
                columns={columns}
                columnLabels={columnLabels}
                idField="id_usuario"
                title="Usuarios"
            />
            {showModal && (
                <ModalForm
                    title="Crear Usuario"
                    fields={[
                        { name: "nom_usuario", label: "Nombre de Usuario", required: true },
                        { name: "hk_contrasena", label: "Contraseña", required: true },
                        { name: "id_personal", label: "ID Personal", required: true },
                        { name: "estado", label: "Estado", defaultValue: "Activo", required: true },
                    ]}
                    onSubmit={handleCreate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default UsuariosTable;
