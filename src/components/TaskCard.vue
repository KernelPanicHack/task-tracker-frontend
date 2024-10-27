<template>
  <div class="max-w-sm bg-white rounded-lg shadow-md p-4 border border-gray-300 h-full">
    <div class="flex items-center justify-between mb-4" style="min-height: 3rem">
      <button class="text-gray-600 hover:text-gray-800 text-xl">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <h2 class="text-lg font-semibold text-black text-center flex-1">
        {{ title }}
      </h2>

      <button @click="showModal" class="text-gray-600 hover:text-gray-800 text-xl">
        <i class="pi pi-pencil"></i>
      </button>
    </div>

    <div v-if="isModalVisible" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span @click="closeModal" class="close">×</span>

        <table class="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">ФИО</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Специальность</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td class="border border-gray-300 px-4 py-2">{{ item.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.fullName }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ item.specialization }}</td>
          </tr>
          </tbody>
        </table>

        <div class="flex justify-between mt-4">
          <button @click="closeModal" class="bg-gray-300 text-white rounded p-2">Отмена</button>
          <button class="bg-blue-500 text-white rounded p-2">Сохранить</button>
        </div>
      </div>
    </div>

    <div class="mt-4" :class="{ 'opacity-50 pointer-events-none': isModalVisible }">
      <div v-if="assignee === 'Не назначен'" class="text-gray-700 text-sm">
        <button @click="showModal" class="bg-green-500 text-white rounded p-2">Назначить исполнителя</button>
      </div>

      <div v-else class="text-gray-700 text-sm">
        <span class="font-medium">Исполнитель:</span> {{ assignee }}
      </div>
    </div>
  </div>
</template>

<script>
import { getUserData } from "@/api/fetchUser.js"; // Импорт функции получения данных

export default {
  data() {
    return {
      isModalVisible: false,
      tableData: [], // Массив для хранения данных пользователей
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true; // Показать модальное окно
      this.loadUserData(); // Загружаем данные пользователей при открытии модального окна
    },
    closeModal() {
      this.isModalVisible = false; // Скрыть модальное окно
    },
    async loadUserData() {
      try {
        const userIds = [15, 16, 17]; // ID пользователей, которых нужно загрузить
        const users = await Promise.all(userIds.map(id => getUserData(id))); // Получаем данные всех пользователей
        this.tableData = users.filter(user => user); // Заполняем tableData, фильтруя возможные null
        console.log(this.tableData); // Логируем данные для проверки
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователей:', error.message);
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: false,
    },
    state: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>
