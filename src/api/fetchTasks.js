import axios from 'axios';

const API_URL = 'http://127.0.0.1:80/';
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
