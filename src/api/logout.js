import axios from 'axios';
import {API_URL} from "@/api/auth.js";

export async function logout() {
            try {
                // Выполняем запрос на выход
                const response = await axios.get(`${API_URL}api/logout`);
                localStorage.removeItem('authToken');
                localStorage.removeItem('user_id');
                // Обрабатываем ответ (например, сбрасываем состояние пользователя)
                console.log('Logout successful:', response.data);
                this.$router.push('/login');
            } catch (error) {
                console.error('Logout error:', error);
            }
        }