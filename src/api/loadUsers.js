import axios from 'axios';
import { API_URL } from "@/api/auth.js"; // Укажите ваш базовый URL

// Функция для получения списка всех пользователей
export const loadUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}api/users`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`, // Добавьте токен авторизации
            },
        });

        const usersData = response.data.users; // Предполагаем, что данные пользователей находятся в поле 'users'
        console.log(usersData);

        // Обработка списка пользователей
        const users = usersData.map(userData => ({
            id: userData.id,
            fullName: `${userData.name} ${userData.surname} ${userData.patronymic}`, // Объединяем в одну строку
            position: userData.specialization, // Должность
            registrationDate: formatDate(userData.created_at), // Форматируем дату регистрации
            avatar_path: userData.avatar_path,
            name: userData.name,
            surname: userData.surname,
        }));

        // Вывод значений в консоль
        users.forEach(user => {
            console.log(user.id, user.fullName, user.position, user.registrationDate, user.avatar_path);
        });

        return users;
    } catch (error) {
        console.error('Ошибка при получении списка пользователей:', error);
        throw error;
    }
};

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Добавляем ноль перед днем, если нужно
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`; // Возвращаем дату в формате ДД.ММ.ГГГГ
}
