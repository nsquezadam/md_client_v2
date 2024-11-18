import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/auth/usuario/');
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users');
        }
    };

    return (
        <div>
            <h2>Usuarios</h2>
            {error && <p>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.nom_usuario}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
