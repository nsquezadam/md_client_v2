import React, { useState } from "react";
import Crudtable from "./Crudtable";
import { createData } from "../../services/apiService";
import ModalForm from "./ModalForm";

const DireccionesTable = () => {
    const [showModal, setShowModal] = useState(false);

    const columns = ["nom_calle", "num_calle", "departamento", "comuna", "ciudad", "region"];
    const columnLabels = {
        nom_calle: "Nombre de Calle",
        num_calle: "Número de Calle",
        departamento: "Departamento",
        comuna: "Comuna",
        ciudad: "Ciudad",
        region: "Región",
    };

    const handleCreate = async (formData) => {
        try {
            await createData("/direccion", formData);
            setShowModal(false);
            alert("Dirección creada con éxito");
        } catch (error) {
            console.error("Error al crear dirección:", error);
            alert("Error al crear dirección");
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Crear Dirección</button>
            <Crudtable
                endpoint="/direccion"
                columns={columns}
                columnLabels={columnLabels}
                idField="id_direccion"
                title="Direcciones"
            />
            {showModal && (
                <ModalForm
                    title="Crear Dirección"
                    fields={[
                        { name: "nom_calle", label: "Nombre de Calle", required: true },
                        { name: "num_calle", label: "Número de Calle", required: true },
                        { name: "departamento", label: "Departamento" },
                        { name: "comuna", label: "Comuna", required: true },
                        { name: "ciudad", label: "Ciudad", required: true },
                        { name: "region", label: "Región", required: true },
                    ]}
                    onSubmit={handleCreate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default DireccionesTable;
