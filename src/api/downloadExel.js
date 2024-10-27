import axios from 'axios';
import { API_URL } from "@/api/auth.js";

export const downloadExcel = async () => {
    try {
        const response = await axios.get(`${API_URL}api/export-tasks`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
            responseType: 'blob', // Устанавливаем тип ответа как blob для загрузки файла
        });

        if (response.status === 200) {
            console.log('Длина полученных данных:', response.data.size); // Логируем размер данных

            // Создаем объект URL для blob
            const url = window.URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }));

            // Создаем элемент <a> для скачивания файла
            const link = document.createElement('a');
            link.href = url;
            link.download = 'tasks.xlsx'; // Имя файла при скачивании

            document.body.appendChild(link); // Добавляем элемент в DOM
            link.click(); // Имитируем клик для скачивания
            link.remove(); // Удаляем элемент после скачивания

            // Освобождаем созданный URL
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Ошибка при получении файла:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при скачивании файла:', error);
    }
};
