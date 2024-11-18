import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonalList() {
    const [personal, setPersonal] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPersonal();
    }, []);

    const fetchPersonal = async () => {
        try {
            const response = await axios.get('/api/auth/personal/');
            setPersonal(response.data);
        } catch (error) {
            setError('Error fetching personal data');
        }
    };

    return (
        <div>
            <h2>Personal</h2>
            {error && <p>{error}</p>}
            <ul>
                {personal.map(person => (
                    <li key={person.id}>{person.primer_nombre} {person.apellido_paterno}</li>
                ))}
            </ul>
        </div>
    );
}

export default PersonalList;
