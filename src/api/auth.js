import axios from 'axios';

// Функция для входа
export const login = async (email, password) => {
    return axios.post('/api/login', { email, password });
};

// Функция для регистрации
export const register = async (email, password, confirmPassword) => {
    return axios.post('/api/register', {
        email,
        password,
        confirmPassword
    });
};
