import React, { useState, useEffect, useCallback } from "react";
import { fetchData, createData, updateData, deleteData } from "../../services/apiService";


const CrudTable = ({ endpoint, columns, title, idField }) => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        try {
            const fetchedData = await fetchData(endpoint);
            if (Array.isArray(fetchedData)) {
                setData(fetchedData);
            } else {
                throw new Error("Datos no válidos recibidos.");
            }
        } catch (err) {
            console.error("Error al cargar los datos:", err.message);
            setError("Error al cargar los datos.");
        }
    }, [endpoint]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", form, "ID:", editingId); // Agrega esto
        try {
          if (editingId) {
            await updateData(endpoint, editingId, form);
          } else {
            await createData(endpoint,form); // Llama a la función del servicio
          }
          setEditingId(null);
          setForm({});
          loadData();
        } catch (err) {
          console.error("Error al guardar los datos:", err.message);
          setError("Error al guardar los datos.");
        }
      };
      

    const handleEdit = (item) => {
        setEditingId(item[idField]);
        setForm(item);
    };

    const handleDelete = async (id) => {
        try {
            await deleteData(endpoint, id);
            console.log("Registro eliminado correctamente.");
            loadData(); // Recarga los datos después de eliminar
        } catch (err) {
            console.error("Error al eliminar los datos:", err.message);
            setError("Error al eliminar los datos.");
        }
    };
    
    return (
        <div className="crud-table">
            <h2>{title}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="crud-form">
                {columns.map((col) => (
                    <div key={col} className="form-group">
                        <label>{col}</label>
                        <input
                            name={col}
                            value={form[col] || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
                <button type="submit" className="btn-submit">
                    {editingId ? "Actualizar" : "Crear"}
                </button>
            </form>
            <table className="crud-table-content">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
            {data.map((item, index) => (
                <tr key={item[idField] || index}> {/* Cambia aquí */}
                    {columns.map((col) => (
                <td key={`${item[idField]}-${col}`}>{item[col]}</td>
                ))}
                <td>
                <button className="btn-edit" onClick={() => handleEdit(item)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(item[idField])}>Eliminar</button>
                </td>
            </tr>
            ))}
            </tbody>
            </table>
        </div>
    );
};

export default CrudTable;
