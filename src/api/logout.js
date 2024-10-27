import axios from 'axios';
import { API_URL } from "@/api/auth.js";
import router from "@/app/router.js";
import { nextTick } from 'vue';

export async function logout() {
    try {
        const response = await axios.get('api/logout', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        localStorage.clear();
        console.log('Logout successful:', response.data);

        await nextTick(); // Дождитесь завершения всех изменений в состоянии
        router.push('/login');
    } catch (error) {
        console.error('Logout error:', error);
        router.push('/main');
    }
}
