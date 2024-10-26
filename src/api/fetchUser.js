import axios from 'axios';
import { API_URL } from "@/api/auth.js"; // Укажите ваш базовый URL

// Функция для получения данных пользователя
export const getUserData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}api/users/${userId}`);
        const userData = response.data.users;
        console.log(response.data);
        // Обработка полей пользователя
        const user = {
            id: userData.id,
            fullName: `${userData.name} ${userData.surname} ${userData.patronymic}`, // Объединяем в одну строку
            email: userData.email,
            specialization: userData.specialization,
            date_of_registration: formatDate(userData.created_at),
            avatar_path: userData.avatar_path,
            name:userData.name,
            surname: userData.surname,
        };

        // Вывод значений в консоль
        console.log(user.id, user.fullName, user.email, user.specialization, user.avatar_path, user.date_of_registration);

        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Добавляем ноль перед днем, если нужно
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}