import { defineStore } from 'pinia';
import { loadTasks } from '@/api/fetchTasks.js';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks')) || [] // Загружаем задачи из localStorage при инициализации
    }),
    actions: {
        async fetchTasks() {
            try {
                const fetchedTasks = await loadTasks(); // Загружаем задачи из API
                this.tasks = fetchedTasks; // Обновляем состояние tasks
                localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Сохраняем в localStorage
                console.log("Задачи загружены:", this.tasks); // Проверка загруженных задач
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            }
        },
        updateTasks(updatedTasks) {
            this.tasks = updatedTasks; // Обновляем состояние tasks
            localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Сохраняем обновленные задачи в localStorage
        },
        clearTasks() {
            this.tasks = []; // Очищаем задачи
            localStorage.removeItem('tasks'); // Удаляем из localStorage
        }
    }
});