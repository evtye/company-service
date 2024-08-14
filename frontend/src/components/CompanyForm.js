import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const CompanyForm = ({ company, onSuccess }) => {
  const [name, setName] = useState(company ? company.name : '');
  const [type, setType] = useState(company ? company.type : 'UNKNOWN');
  const [inn, setInn] = useState(company ? company.inn : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, type, inn };

    try {
      if (company) {
        await axios.put(`${apiUrl}/companies/${company.id}`, payload);
      } else {
        await axios.post(`${apiUrl}/companies/`, payload);
      }
      onSuccess();
    } catch (error) {
      console.error("Ошибка при сохранении компании:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Тип:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="UNKNOWN">Неизвестно</option>
          <option value="LEGAL_ENTITY">ЮЛ</option>
          <option value="INDIVIDUAL">ИП</option>
        </select>
      </div>
      <div>
        <label>ИНН:</label>
        <input
          type="text"
          value={inn}
          onChange={(e) => setInn(e.target.value)}
          required
        />
      </div>
      <button type="submit">{company ? 'Обновить' : 'Создать'}</button>
    </form>
  );
};

export default CompanyForm;
