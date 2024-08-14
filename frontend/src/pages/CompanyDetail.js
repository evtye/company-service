import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompany, deleteCompany } from '../api'; // Импортируйте функции из api.js
import CompanyForm from '../components/CompanyForm';

function CompanyDetail() {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanyData();
    }, [id]);

    const fetchCompanyData = async () => {
        try {
            const response = await fetchCompany(id);
            setCompany(response.data);
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCompany(id);
            navigate('/');
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    };

    return (
        <div>
            {company ? (
                <>
                    {isEditing ? (
                        <CompanyForm
                            initialData={company}
                            companyId={id}
                        />
                    ) : (
                        <>
                            <h1>{company.name}</h1>
                            <p>INN: {company.inn}</p>
                            <p>Ownership Type: {company.ownership_type}</p>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CompanyDetail;
