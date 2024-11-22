import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../../services/apiService";
import "./PersonalTable.css";
import PersonalModal from "./PersonalModal";

const PersonalTable = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [error, setError] = useState("");

    // Cargar datos de la tabla Personal
    const loadData = async () => {
        try {
            const result = await fetchData("personal");
            setData(result);
        } catch (err) {
            console.error("Error al cargar los datos de personal:", err);
            setError("No se pudieron cargar los datos de personal.");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Abrir modal para crear nuevo personal
    const openCreateModal = () => {
        setEditMode(false);
        setSelectedPersonal({
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
        });
        setModalOpen(true);
    };

    // Abrir modal para editar personal existente
    const openEditModal = (personal) => {
        setEditMode(true);
        setSelectedPersonal(personal);
        setModalOpen(true);
    };

    // Manejar creación de personal
    const handleCreate = async (newPersonal) => {
        try {
            const createdPersonal = await createData("personal", newPersonal);
            setData((prevData) => [...prevData, createdPersonal]);
            setModalOpen(false);
        } catch (err) {
            console.error("Error al crear personal:", err);
            alert("No se pudo crear el personal.");
        }
    };

    // Manejar edición de personal
    const handleSaveEdit = async (updatedPersonal) => {
        try {
            await updateData("personal", updatedPersonal.id_personal, updatedPersonal);
            setData((prevData) =>
                prevData.map((item) =>
                    item.id_personal === updatedPersonal.id_personal ? updatedPersonal : item
                )
            );
            setModalOpen(false);
        } catch (err) {
            console.error("Error al guardar el personal editado:", err);
            alert("No se pudo guardar el personal.");
        }
    };

    // Manejar eliminación de personal
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este personal?")) {
            try {
                await deleteData("personal", id);
                setData((prevData) => prevData.filter((item) => item.id_personal !== id));
            } catch (err) {
                console.error("Error al eliminar personal:", err);
                alert("No se pudo eliminar el personal.");
            }
        }
    };

    return (
        <div className="personal-table">
            <h3>Gestión de Personal</h3>
            {error && <p className="error">{error}</p>}
            <button className="btn_modal_personal" onClick={openCreateModal}>Crear Personal</button>
            <div className="table-container">
                {/* Mostrar tabla en pantallas grandes */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>RUT</th>
                            <th>Primer Nombre</th>
                            <th>Segundo Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>Fecha de Contratación</th>
                            <th>ID Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((personal) => (
                            <tr key={personal.id_personal}>
                                <td>{personal.id_personal}</td>
                                <td>{personal.rut_completo}</td>
                                <td>{personal.primer_nombre}</td>
                                <td>{personal.segundo_nombre}</td>
                                <td>{personal.apellido_paterno}</td>
                                <td>{personal.apellido_materno}</td>
                                <td>{personal.fec_nacimiento}</td>
                                <td>{personal.telefono}</td>
                                <td>{personal.correo_electronico}</td>
                                <td>{personal.fec_contratacion}</td>
                                <td>{personal.id_direccion}</td>
                                <td>
                                    <button className="btn_table_personal" onClick={() => openEditModal(personal)}>Editar</button>
                                    <button className="btn_table_personal" onClick={() => handleDelete(personal.id_personal)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    
                {/* Mostrar tarjetas en pantallas pequeñas */}
                <div className="card-list">
                    {data.map((personal) => (
                        <div key={personal.id_personal} className="card">
                            <div><span>ID:</span> {personal.id_personal}</div>
                            <div><span>RUT:</span> {personal.rut_completo}</div>
                            <div><span>Primer Nombre:</span> {personal.primer_nombre}</div>
                            <div><span>Segundo Nombre:</span> {personal.segundo_nombre}</div>
                            <div><span>Apellido Paterno:</span> {personal.apellido_paterno}</div>
                            <div><span>Apellido Materno:</span> {personal.apellido_materno}</div>
                            <div><span>Fecha de Nacimiento:</span> {personal.fec_nacimiento}</div>
                            <div><span>Teléfono:</span> {personal.telefono}</div>
                            <div><span>Correo Electrónico:</span> {personal.correo_electronico}</div>
                            <div><span>Fecha de Contratación:</span> {personal.fec_contratacion}</div>
                            <div><span>ID Dirección:</span> {personal.id_direccion}</div>
                            <button onClick={() => openEditModal(personal)}>Editar</button>
                            <button onClick={() => handleDelete(personal.id_personal)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <PersonalModal
                    personal={selectedPersonal}
                    onSave={isEditMode ? handleSaveEdit : handleCreate}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
    
    
    
};

export default PersonalTable;
