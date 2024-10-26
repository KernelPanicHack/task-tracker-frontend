<template>
  <div>
<!--    <h3 class="text-lg font-semibold">Настройки админ-панели</h3>-->

    <!-- Таблица пользователей -->
    <table class="min-w-full border-collapse border border-gray-300 mt-4">
      <thead>
      <tr>
        <th class="border border-gray-300 px-4 py-2 text-left">ФИО</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Должность</th>
        <th class="border border-gray-300 px-4 py-2 text-left">Дата регистрации</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in usersList" :key="user.fullName" class="hover:bg-gray-100">
        <td class="border border-gray-300 px-4 py-2">{{ user.fullName }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.position }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ user.registrationDate }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Кнопка для обновления списка пользователей -->
    <button @click="refreshUsers" class="mt-4 bg-blue-500 text-white p-2 rounded">
      Обновить список пользователей
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadUsers } from '@/api/loadUsers'; // Импортируйте функцию для загрузки пользователей

const usersList = ref([]); // Список пользователей

// Функция для получения пользователей из API
const fetchUsers = async () => {
  try {
    usersList.value = await loadUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
};

// Функция для обновления списка пользователей
const refreshUsers = async () => {
  await fetchUsers();
};

// Загрузка пользователей при монтировании компонента
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>
