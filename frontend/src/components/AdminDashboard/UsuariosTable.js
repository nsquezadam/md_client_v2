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
            await updateData("usuario", updatedUsuario.id_usuario, updatedUsuario);
            loadData(); // Actualizar la tabla después de la edición
            setModalOpen(false);
        } catch (err) {
            console.error("Error al guardar el usuario editado:", err);
            alert("No se pudo guardar el usuario.");
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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de Usuario</th>
                        <th>Contraseña</th>
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
                            {/* <td>••••••••</td> */}
                            <td>{usuario.id_personal}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <button onClick={() => {
                                    setEditMode(true);
                                    setSelectedUsuario(usuario);
                                    setModalOpen(true);
                                }}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</button>
                                {/* <button onClick={() => handleResetPassword(usuario.id_usuario)}>Restablecer Contraseña</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
