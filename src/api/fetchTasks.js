import axios from 'axios';

import { API_URL } from '@/api/auth.js';


const apiClient = axios.create({
    baseURL: API_URL,
});

export async function loadTasks() {
    try {
        const response = await apiClient.get('api/tasks', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        const tasks= response.data;
        console.log(tasks); // Проверка полученных данных
        return tasks;
    } catch (error) {
        console.error("Error loading tasks:", error);
        throw error;
    }
}
