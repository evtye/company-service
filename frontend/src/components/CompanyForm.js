// src/components/CompanyForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CompanyForm({ initialData = { name: '', ownership_type: '', inn: '' }, companyId }) {
    const [name, setName] = useState(initialData.name);
    const [ownershipType, setOwnershipType] = useState(initialData.ownership_type);
    const [inn, setInn] = useState(initialData.inn);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const companyData = { name, ownership_type: ownershipType, inn };

        try {
            if (companyId) {
                await axios.put(`/companies/${companyId}`, companyData);
            } else {
                await axios.post('/companies/', companyData);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save company:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Ownership Type:</label>
                <input
                    type="number"
                    value={ownershipType}
                    onChange={(e) => setOwnershipType(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>INN:</label>
                <input
                    type="text"
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default CompanyForm;
