import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../../services/apiService";
import "./DireccionesTable.css";
import EditModal from "./EditModal.js";

const DireccionesTable = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [selectedDireccion, setSelectedDireccion] = useState(null);
    const [error, setError] = useState("");

    // Al abrir el modal para crear una nueva dirección
    const openCreateModal = () => {
        setEditMode(false);
        setSelectedDireccion({
            nom_calle: "",
            num_calle: "",
            departamento: "",
            comuna: "",
            ciudad: "",
            region: "",
        });
        setModalOpen(true);
    };

    // Al abrir el modal para editar una dirección existente
    const openEditModal = (direccion) => {
        setEditMode(true);
        setSelectedDireccion(direccion);
        setModalOpen(true);
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        const loadData = async () => {
            try {
                
                const result = await fetchData("direccion");
                setData(result);
            } catch (err) {
                console.error("Error al cargar las direcciones:", err);
                setError("No se pudieron cargar las direcciones.");
            }
        };
        loadData();
    }, []);

    // Manejar creación de dirección
    const handleCreate = async (newDireccion) => {
        try {
            console.log(newDireccion)
            const createdDireccion = await createData("direccion", newDireccion);
            console.log(newDireccion)
            setData([...data, createdDireccion]);
            setModalOpen(false);
        } catch (err) {
            console.error("Error al crear dirección:", err);
            alert("No se pudo crear la dirección.");
        }
    };

    // Manejar edición de dirección
    const handleSaveEdit = async (updatedDireccion) => {
        try {
            await updateData("direccion", updatedDireccion.id_direccion, updatedDireccion);
            setData(data.map((item) =>
                item.id_direccion === updatedDireccion.id_direccion ? updatedDireccion : item
            ));
            setModalOpen(false);
        } catch (err) {
            console.error("Error al guardar la dirección editada:", err);
            alert("No se pudo guardar la dirección.");
        }
    };

    // Manejar eliminación de dirección
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta dirección?")) {
            try {
                await deleteData("direccion", id);
                setData(data.filter((item) => item.id_direccion !== id));
            } catch (err) {
                console.error("Error al eliminar dirección:", err);
                alert("No se pudo eliminar la dirección.");
            }
        }
    };

    return (
        <div className="direcciones-table">
            <h3>Gestión de Direcciones</h3>
            {error && <p className="error">{error}</p>}
            <button onClick={openCreateModal}>Crear Dirección</button>
    
            {/* Tabla para pantallas grandes */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Calle</th>
                            <th>Número</th>
                            <th>Departamento</th>
                            <th>Comuna</th>
                            <th>Ciudad</th>
                            <th>Región</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((direccion) => (
                            <tr key={direccion.id_direccion}>
                                <td>{direccion.id_direccion}</td>
                                <td>{direccion.nom_calle}</td>
                                <td>{direccion.num_calle}</td>
                                <td>{direccion.departamento}</td>
                                <td>{direccion.comuna}</td>
                                <td>{direccion.ciudad}</td>
                                <td>{direccion.region}</td>
                                <td>
                                    <button className="btn-table-direc" onClick={() => openEditModal(direccion)}>Editar</button>
                                    <button className="btn-table-direc" onClick={() => handleDelete(direccion.id_direccion)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* Tarjetas para pantallas pequeñas */}
            <div className="card-list">
                {data.map((direccion) => (
                    <div key={direccion.id_direccion} className="card">
                        <div><span>ID:</span> {direccion.id_direccion}</div>
                        <div><span>Calle:</span> {direccion.nom_calle}</div>
                        <div><span>Número:</span> {direccion.num_calle}</div>
                        <div><span>Departamento:</span> {direccion.departamento}</div>
                        <div><span>Comuna:</span> {direccion.comuna}</div>
                        <div><span>Ciudad:</span> {direccion.ciudad}</div>
                        <div><span>Región:</span> {direccion.region}</div>
                        <button onClick={() => openEditModal(direccion)}>Editar</button>
                        <button onClick={() => handleDelete(direccion.id_direccion)}>Eliminar</button>
                    </div>
                ))}
            </div>
    
            {isModalOpen && selectedDireccion && (
                <EditModal
                    direccion={selectedDireccion}
                    onSave={isEditMode ? handleSaveEdit : handleCreate}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
    
};

export default DireccionesTable;
