import axios from 'axios';
import {API_URL} from "@/api/auth.js";

{API_URL} // Замените на ваш URL API

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/role:user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Замените на ваш способ авторизации
            },
        });

        // Обработка полученных данных
        const users = response.data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            surname: user.surname,
            patronymic: user.patronymic,
            specialization: user.specialization || 'Не указана', // Добавить специальность, если она есть
            login: user.login,
            roles: user.roles.map(role => ({
                id: role.id,
                name: role.name,
            })),
        }));

        return users; // Вернуть обработанные данные пользователей
    } catch (error) {
        console.error('Ошибка при получении данных пользователей:', error);
        throw error; // Пробросить ошибку дальше
    }
};

// Пример использования функции
fetchUsers()
    .then(users => console.log(users))
    .catch(error => console.error(error));
