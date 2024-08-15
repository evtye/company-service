import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </Router>
  );
}

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', ownership_type: 0, inn: '' });

  useEffect(() => {
    axios.get(`${apiURL}/companies/?skip=${page * 10}&limit=10`)
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err));
  }, [page]);

  const handleCreateCompany = () => {
    axios.post(`${apiURL}/companies/`, newCompany)
      .then(res => {
        setCompanies([res.data, ...companies]);
        setShowForm(false);
        setNewCompany({ name: '', ownership_type: 0, inn: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Company List</h1>
      <button onClick={() => setShowForm(true)}>Add Company</button>

      {showForm && (
        <div>
          <h2>Create Company</h2>
          <input
            type="text"
            placeholder="Name"
            value={newCompany.name}
            onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
          />
          <select
            value={newCompany.ownership_type}
            onChange={e => setNewCompany({ ...newCompany, ownership_type: Number(e.target.value) })}
          >
            <option value={0}>Неизвестно</option>
            <option value={1}>ИП</option>
            <option value={2}>ЮЛ</option>
          </select>
          <input
            type="text"
            placeholder="INN"
            value={newCompany.inn}
            onChange={e => setNewCompany({ ...newCompany, inn: e.target.value })}
          />
          <button onClick={handleCreateCompany}>Save</button>
        </div>
      )}

      <ul>
        {companies.map(company => (
          <li key={company.company_id}>
            <Link to={`/company/${company.company_id}`}>
              {company.company_id} - {company.name}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCompany, setUpdatedCompany] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Получение параметра id из URL

  useEffect(() => {
    axios.get(`${apiURL}/companies/${id}`)
      .then(res => {
        setCompany(res.data);
        setUpdatedCompany(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdateCompany = () => {
    axios.put(`${apiURL}/companies/${id}`, updatedCompany)
      .then(res => {
        setCompany(res.data);
        setIsEditing(false);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteCompany = () => {
    axios.delete(`${apiURL}/companies/${id}`)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h1>Company Detail</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedCompany.name}
            onChange={e => setUpdatedCompany({ ...updatedCompany, name: e.target.value })}
          />
          <select
            value={updatedCompany.ownership_type}
            onChange={e => setUpdatedCompany({ ...updatedCompany, ownership_type: Number(e.target.value) })}
          >
            <option value={0}>Неизвестно</option>
            <option value={1}>ИП</option>
            <option value={2}>ЮЛ</option>
          </select>
          <input
            type="text"
            value={updatedCompany.inn}
            onChange={e => setUpdatedCompany({ ...updatedCompany, inn: e.target.value })}
          />
          <button onClick={handleUpdateCompany}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {company.name}</p>
          <p>Ownership Type: {company.ownership_type === 0 ? 'Неизвестно' : company.ownership_type === 1 ? 'ИП' : 'ЮЛ'}</p>
          <p>INN: {company.inn}</p>
        </div>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <button onClick={handleDeleteCompany}>Delete</button>
    </div>
  );
}

export default App;
