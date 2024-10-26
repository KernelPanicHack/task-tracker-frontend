import axios from 'axios';
import {API_URL} from "@/api/auth.js";

export async function logout() {
            try {
                // Выполняем запрос на выход
                const response = await axios.get('api/logout', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                localStorage.removeItem('authToken');
                localStorage.removeItem('user_id');
                // Обрабатываем ответ (например, сбрасываем состояние пользователя)
                console.log('Logout successful:', response.data);
                this.$router.push({name: 'RegLog'});
            } catch (error) {
                console.error('Logout error:', error);
            }
        }