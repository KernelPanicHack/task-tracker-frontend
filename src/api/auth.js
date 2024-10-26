import axios from 'axios';

export const API_URL = 'http://192.168.10.191:80';
const apiClient = axios.create({
    baseURL: API_URL,
});

export const login = async (email, password) => {
    const payload = { email, password };
    console.log('Login request payload:', payload);
    return apiClient.post('/api/login', payload);
};

export const register = async (email, fullName, login, password, password_confirmation) => {
    const payload = {
        email,
        fullName,
        login,
        password,
        password_confirmation,
    };
    console.log('Registration request payload:', payload);
    return apiClient.post('/api/register', payload);
};
