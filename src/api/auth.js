import axios from 'axios';

const API_URL = 'http://192.168.10.191:80/';
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
