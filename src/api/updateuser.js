import axios from 'axios';
import { API_URL } from '@/api/auth.js';

const apiClient = axios.create({
    baseURL: API_URL,
});

export async function updateUser(fullName, specialization) {
    const userId = localStorage.getItem('user_id'); // Получаем ID пользователя из localStorage
    try {
        const response = await apiClient.put(`/api/users/${userId}/update`, { fullName, specialization }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data; // Возвращаем ответ
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Обработка ошибки
    }
}
