import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../../services/apiService";
import "./UsuariosTable.css";
import UsuarioModal from "./UsuarioModal";

const UsuariosTable = () => {
    const [data, setData] = useState([]);
    const [personalOptions, setPersonalOptions] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [error, setError] = useState("");

    const loadPersonalOptions = async () => {
        try {
            const result = await fetchData("personal");
            setPersonalOptions(result);
        } catch (err) {
            console.error("Error al cargar opciones de personal:", err);
        }
    };

    const loadData = async () => {
        try {
            const result = await fetchData("usuario");
            setData(result);
        } catch (err) {
            console.error("Error al cargar los datos de usuario:", err);
            setError("No se pudieron cargar los datos de usuario.");
        }
    };

    useEffect(() => {
        loadData();
        loadPersonalOptions();
    }, []);

    const handleCreate = async (newUsuario) => {
        try {
            await createData("usuario", newUsuario);
            loadData(); // Actualizar la tabla después de la creación
            setModalOpen(false);
        } catch (err) {
            console.error("Error al crear usuario:", err);
            alert("No se pudo crear el usuario.");
        }
    };

    const handleSaveEdit = async (updatedUsuario) => {
        try {
            if (!updatedUsuario.id_usuario) {
                throw new Error("ID de usuario no definido.");
            }
            await updateData("usuario", updatedUsuario.id_usuario, updatedUsuario);
            setData((prevData) =>
                prevData.map((item) =>
                    item.id_usuario === updatedUsuario.id_usuario ? updatedUsuario : item
                )
            );
            setModalOpen(false);
        } catch (err) {
            console.error("Error al guardar el usuario editado:", err);
            alert("No se pudo guardar el usuario editado.");
        }
    };
    

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await deleteData("usuario", id);
                loadData(); // Actualizar la tabla después de la eliminación
            } catch (err) {
                console.error("Error al eliminar usuario:", err);
                alert("No se pudo eliminar el usuario.");
            }
        }
    };
    //para  futuro
    // const handleResetPassword = async (idUsuario) => {
    //     try {
    //         await fetchData(`usuario/${idUsuario}/reset-password`, { method: "POST" });
    //         alert("Correo de restablecimiento enviado.");
    //     } catch (err) {
    //         console.error("Error al restablecer la contraseña:", err);
    //         alert("No se pudo enviar el correo de restablecimiento.");
    //     }
    // };

    return (
        <div className="usuarios-table">
            <h3>Gestión de Usuarios</h3>
            {error && <p className="error">{error}</p>}
            <button onClick={() => {
                setEditMode(false);
                setSelectedUsuario(null);
                setModalOpen(true);
            }}>
                Crear Usuario
            </button>
    
            {/* Tabla para pantallas grandes */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de Usuario</th>
                            <th>Personal</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((usuario) => (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nom_usuario}</td>
                                <td>{usuario.id_personal}</td>
                                <td>{usuario.estado}</td>
                                <td>
                                    <button className="btn-table_usu" onClick={() => {
                                        setEditMode(true);
                                        setSelectedUsuario(usuario);
                                        setModalOpen(true);
                                    }}>
                                        Editar
                                    </button>
                                    <button className="btn-table_usu" onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* Tarjetas para pantallas pequeñas */}
            <div className="card-list">
                {data.map((usuario) => (
                    <div key={usuario.id_usuario} className="card">
                        <div><span>ID:</span> {usuario.id_usuario}</div>
                        <div><span>Nombre de Usuario:</span> {usuario.nom_usuario}</div>
                        <div><span>Personal:</span> {usuario.id_personal}</div>
                        <div><span>Estado:</span> {usuario.estado}</div>
                        <button onClick={() => {
                            setEditMode(true);
                            setSelectedUsuario(usuario);
                            setModalOpen(true);
                        }}>
                            Editar
                        </button>
                        <button onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</button>
                    </div>
                ))}
            </div>
    
            {isModalOpen && (
                <UsuarioModal
                    usuario={selectedUsuario}
                    onSave={isEditMode ? handleSaveEdit : handleCreate}
                    onClose={() => setModalOpen(false)}
                    personalOptions={personalOptions}
                />
            )}
        </div>
    );
    
};

export default UsuariosTable;
