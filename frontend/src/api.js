import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const fetchCompanies = (page, limit) => {
    return api.get(`/companies?skip=${page * limit}&limit=${limit}`);
};

export const fetchCompany = (id) => {
    return api.get(`/companies/${id}`);
};

export const createCompany = (companyData) => {
    return api.post('/companies/', companyData);
};

export const updateCompany = (id, companyData) => {
    return api.put(`/companies/${id}`, companyData);
};

export const deleteCompany = (id) => {
    return api.delete(`/companies/${id}`);
};
