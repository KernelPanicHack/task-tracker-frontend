import axios from 'axios';

export const API_URL = 'http://127.0.0.1:80/';
const apiClient = axios.create({
    baseURL: API_URL,
});

export const login = async (email, password) => {
    return apiClient.post('/api/login', { email, password });
};

export const register = async (email, fullName, login, password, password_confirmation) => {
    return apiClient.post('/api/register', {
        email,
        fullName,
        login,
        password,
        password_confirmation
    });
};
