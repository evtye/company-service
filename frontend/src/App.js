import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './pages/CompanyList';
import CompanyDetail from './pages/CompanyDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CompanyList />} />
                <Route path="/companies/:id" element={<CompanyDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
