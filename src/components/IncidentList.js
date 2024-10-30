import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NEW');

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        const response = await axios.get('http://localhost:8080/api/incidents');
        setIncidents(response.data);
    };

    const createIncident = async () => {
        const newIncident = { title, description, status, timestamp: new Date().toISOString() };
        await axios.post('http://localhost:8080/api/incidents', newIncident);
        fetchIncidents();
        setTitle('');
        setDescription('');
    };

    const deleteIncident = async (id) => {
        await axios.delete(`http://localhost:8080/api/incidents/${id}`);
        fetchIncidents();
    };

    return (
        <div>
            <h1>Incident Manager</h1>
            <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="NEW">NEW</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
            </select>
            <button onClick={createIncident}>Create Incident</button>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        {incident.title} - {incident.status}
                        <button onClick={() => deleteIncident(incident.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default IncidentList;

