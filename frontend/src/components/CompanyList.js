import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const CompanyList = ({ onEdit }) => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/companies/`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Ошибка при получении списка компаний:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/companies/${id}`);
      fetchCompanies(); // обновляем список после удаления
    } catch (error) {
      console.error("Ошибка при удалении компании:", error);
    }
  };

  return (
    <div>
      <h2>Список компаний</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name} ({company.type}) - ИНН: {company.inn}
            <button onClick={() => onEdit(company)}>Редактировать</button>
            <button onClick={() => handleDelete(company.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
