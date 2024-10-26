import axios from 'axios';

const API_URL = 'http://127.0.0.1:80/';
const apiClient = axios.create({
    baseURL: API_URL,
});

export async function loadStates() {
    try {
        const response = await apiClient.get('api/states', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        const states = response.data;
        console.log(states); // Проверка полученных данных
        return states;
    } catch (error) {
        console.error("Error loading states:", error);
        throw error;
    }
}
