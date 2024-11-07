import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NEW');
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({}); // save error

    // 分页相关状态
    const [currentPage, setCurrentPage] = useState(1);
    const [incidentsPerPage] = useState(3); // 3 per page

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        const response = await axios.get('http://localhost:8080/api/incidents');
        setIncidents(response.data);
    };

    const createIncident = async () => {
        const newIncident = { title, description, status, timestamp: new Date().toISOString() };

        try {
            await axios.post('http://localhost:8080/api/incidents', newIncident);
            await fetchIncidents(); // refresh event
            resetForm(); // reset
            setErrors({}); // clear error
        } catch (error) {
            if (error.response) {
                // 服务器返回的错误信息
                setErrors(error.response.data); // 将错误信息设置到状态中
                console.log("Validation errors:", error.response.data); // 打印错误信息到控制台
            } else {
                console.error("Error:", error.message);
                setErrors({ general: "An unexpected error occurred." }); // 一般错误信息
            }
        }
    };

    const editIncident = async (id) => {
        const incidentToEdit = incidents.find(incident => incident.id === id);
        setTitle(incidentToEdit.title);
        setDescription(incidentToEdit.description);
        setStatus(incidentToEdit.status);
        setEditingId(id);
    };

    const updateIncident = async () => {
        const updatedIncident = { title, description, status, timestamp: new Date().toISOString() };
        await axios.put(`http://localhost:8080/api/incidents/${editingId}`, updatedIncident);
        await fetchIncidents();
        resetForm();
    };

    const deleteIncident = async (id) => {
        await axios.delete(`http://localhost:8080/api/incidents/${id}`);
        await fetchIncidents();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStatus('NEW');
        setEditingId(null);
    };

    // calc page
    const indexOfLastIncident = currentPage * incidentsPerPage;
    const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
    const currentIncidents = incidents.slice(indexOfFirstIncident, indexOfLastIncident);

    // total
    const totalPages = Math.ceil(incidents.length / incidentsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h1>Incident Manager</h1>
            {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>} {/* handle tittle error */}
            {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>} {/* handle description error */}
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
            <button onClick={editingId ? updateIncident : createIncident}>
                {editingId ? 'Save Changes' : 'Create Incident'}
            </button>

            <ul>
                {currentIncidents.map(incident => (
                    <li key={incident.id}>
                        {incident.title} - {incident.status}
                        <button onClick={() => editIncident(incident.id)}>Edit</button>
                        <button onClick={() => deleteIncident(incident.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Page */}
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} / {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default IncidentList;
