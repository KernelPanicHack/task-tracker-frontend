// stores/taskStore.js
import { defineStore } from 'pinia';
import { loadTasks } from '@/api/fetchTasks';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: []
    }),
    actions: {
        async fetchTasks() {
            try {
                this.tasks = await loadTasks();
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        }
    }
});
