import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CompanyForm from '../components/CompanyForm';

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchCompanies();
    }, [page, limit]);

    const fetchCompanies = async () => {
        const response = await axios.get(`/companies?skip=${page * limit}&limit=${limit}`);
        setCompanies(response.data);
    };

    const handleAddCompany = () => {
        setIsCreating(true);
    };

    return (
        <div>
            <h1>Companies</h1>
            {isCreating ? (
                <CompanyForm />
            ) : (
                <button onClick={handleAddCompany}>Add Company</button>
            )}
            <ul>
                {companies.map((company) => (
                    <li key={company.company_id}>
                        <Link to={`/companies/${company.company_id}`}>{company.name}</Link>
                    </li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
}

export default CompanyList;
