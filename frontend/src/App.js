import React, { useState } from 'react';
import CompanyForm from './components/CompanyForm';
import CompanyList from './components/CompanyList';

function App() {
  const [editingCompany, setEditingCompany] = useState(null);

  const handleEdit = (company) => {
    setEditingCompany(company);
  };

  const handleSuccess = () => {
    setEditingCompany(null);
  };

  return (
    <div className="App">
      <h1>Управление компаниями</h1>
      <CompanyForm company={editingCompany} onSuccess={handleSuccess} />
      <CompanyList onEdit={handleEdit} />
    </div>
  );
}

export default App;
