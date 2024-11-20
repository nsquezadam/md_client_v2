import React, { useState } from "react";
import Crudtable from "./Crudtable";
import { createData } from "../../services/apiService";
import ModalForm from "./ModalForm";

const PersonalTable = () => {
    const [showModal, setShowModal] = useState(false);

    const columns = [
        "rut_completo",
        "primer_nombre",
        "segundo_nombre",
        "apellido_paterno",
        "apellido_materno",
        "fec_nacimiento",
        "telefono",
        "correo_electronico",
        "fec_contratacion",
        "id_direccion",
    ];
    const columnLabels = {
        rut_completo: "RUT",
        primer_nombre: "Primer Nombre",
        segundo_nombre: "Segundo Nombre",
        apellido_paterno: "Apellido Paterno",
        apellido_materno: "Apellido Materno",
        fec_nacimiento: "Fecha de Nacimiento",
        telefono: "Teléfono",
        correo_electronico: "Correo Electrónico",
        fec_contratacion: "Fecha de Contratación",
        id_direccion: "ID Dirección",
    };

    const handleCreate = async (formData) => {
        try {
            await createData("/personal", formData);
            setShowModal(false);
            alert("Personal creado con éxito");
        } catch (error) {
            console.error("Error al crear personal:", error);
            alert("Error al crear personal");
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Crear Personal</button>
            <Crudtable
                endpoint="/personal"
                columns={columns}
                columnLabels={columnLabels}
                idField="id_personal"
                title="Personal"
            />
            {showModal && (
                <ModalForm
                    title="Crear Personal"
                    fields={[
                        { name: "rut_completo", label: "RUT", required: true },
                        { name: "primer_nombre", label: "Primer Nombre", required: true },
                        { name: "segundo_nombre", label: "Segundo Nombre" },
                        { name: "apellido_paterno", label: "Apellido Paterno", required: true },
                        { name: "apellido_materno", label: "Apellido Materno", required: true },
                        { name: "fec_nacimiento", label: "Fecha de Nacimiento", type: "date", required: true },
                        { name: "telefono", label: "Teléfono", required: true },
                        { name: "correo_electronico", label: "Correo Electrónico", type: "email", required: true },
                        { name: "fec_contratacion", label: "Fecha de Contratación", type: "date", required: true },
                        { name: "id_direccion", label: "ID Dirección", required: true },
                    ]}
                    onSubmit={handleCreate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default PersonalTable;
