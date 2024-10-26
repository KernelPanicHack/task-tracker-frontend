import axios from 'axios';
import { API_URL } from '@/api/auth.js';
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
