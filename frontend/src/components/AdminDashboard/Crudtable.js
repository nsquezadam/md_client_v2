import React, { useState, useEffect } from "react";
import { fetchData, updateData, deleteData } from "../../services/apiService";
import "./Crudtable.css";

const Crudtable = ({ endpoint, columns, columnLabels, idField, title }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [editRow, setEditRow] = useState(null); // Estado para controlar la edición
    const [formData, setFormData] = useState({}); // Datos del formulario

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData(endpoint);
                setData(result);
            } catch (err) {
                setError("Error al cargar los datos.");
            }
        };
        loadData();
    }, [endpoint]);

    const handleEditClick = (row) => {
        setEditRow(row);
        setFormData(row);
    };

    const handleFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (e) => {
        try {
            await updateData(endpoint, formData[idField], formData);
            setData((prevData) =>
                prevData.map((item) =>
                    item[idField] === formData[idField] ? formData : item
                )
            );
            setEditRow(null);
        } catch (err) {
            setError("Error al guardar los datos.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteData(endpoint, id);
            setData((prevData) => prevData.filter((item) => item[idField] !== id));
        } catch (err) {
            setError("Error al eliminar los datos.");
        }
    };

    return (
        <div className="crud-table">
            <h3>{title}</h3>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{columnLabels[col]}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row[idField]}>
                            {columns.map((col) => (
                                <td key={`${row[idField]}-${col}`}>{row[col]}</td>
                            ))}
                            <td>
                                <button onClick={() => handleEditClick(row)}>Editar</button>
                                <button onClick={() => handleDelete(row[idField])}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario emergente para edición */}
            {editRow && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Editar {title}</h3>
                        {columns.map((col) => (
                            <div key={col}>
                                <label>{columnLabels[col]}</label>
                                <input
                                    type="text"
                                    name={col}
                                    value={formData[col] || ""}
                                    onChange={handleFormChange}
                                />
                            </div>
                        ))}
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={() => setEditRow(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crudtable;
