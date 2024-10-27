import axios from 'axios';

const API_URL = 'https://ваш_адрес_api/'; // Замените на ваш URL

export const fetchUsersWithTasksAndRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Замените на ваш способ авторизации
            },
        });

        if (response.status !== 200) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return response.data; // Вернуть полученные данные
    } catch (error) {
        console.error('Ошибка при получении данных пользователей:', error);
        throw error; // Пробросить ошибку дальше
    }
};
