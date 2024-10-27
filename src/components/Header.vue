<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { logout as apiLogout } from "@/api/logout.js";
import { getUserData } from '@/api/fetchUser.js';
import { updateUser } from '@/api/updateUser.js';
import { useTaskStore } from '@/store/taskStore';
import { downloadExcel } from "@/api/downloadExel.js";

const taskStore = useTaskStore();
const refreshTasks = () => {
  taskStore.fetchTasks();
};

const handleDownloadClick = async () => {
  try {
    await downloadExcel();
  } catch (error) {
    console.error('Ошибка при скачивании файла:', error);
  }
};

const searchQuery = ref('');
const showUserInfo = ref(false);
const fullName = ref('');
const position = ref('');
const roleUser = ref(localStorage.getItem('userRole') || '');
const registrationDate = ref('');
const isEditingName = ref(false);
const isEditingPosition = ref(false);
const userAvatar = ref('');
const userLetters = ref('');

const handleClickOutside = (event) => {
  const userInfoElement = document.getElementById('user-info');
  if (userInfoElement && !userInfoElement.contains(event.target)) {
    showUserInfo.value = false;
  }
};

onMounted(async () => {
  document.addEventListener('mouseup', handleClickOutside);

  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const userData = await getUserData(userId);
    if (userData) {
      fullName.value = userData.fullName || '';
      position.value = userData.specialization || '';
      roleUser.value = userData.roles || '';
      localStorage.setItem('roleUser', JSON.stringify(roleUser.value));
      registrationDate.value = userData.date_of_registration || '';
      userAvatar.value = userData.avatar_path || '';
      userLetters.value = userAvatar.value
          ? ''
          : `${userData.name.charAt(0)}${userData.surname.charAt(0)}`.toUpperCase();
    } else {
      console.error('No user data returned');
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', handleClickOutside);
});

// Функции управления
const toggleUserInfo = () => {
  showUserInfo.value = !showUserInfo.value;
};

const toggleEditName = () => {
  isEditingName.value = !isEditingName.value;
};

const toggleEditPosition = () => {
  isEditingPosition.value = !isEditingPosition.value;
};

const saveNameChanges = async () => {
  try {
    await updateUser(fullName.value, position.value);
    isEditingName.value = false;
  } catch (error) {
    console.error('Failed to save name changes:', error);
  }
};

const savePositionChanges = async () => {
  try {
    await updateUser(fullName.value, position.value);
    isEditingPosition.value = false;
  } catch (error) {
    console.error('Failed to save position changes:', error);
  }
};

const logout = async () => {
  await apiLogout();
  showUserInfo.value = false; // Закрыть модальные окна при выходе
};
</script>

<template>
  <header class="flex justify-around items-center bg-main-color w-full">
    <div class="flex items-center">
      <img src="../assets/NETRELLO.svg" alt="logo">
    </div>
    <div class="flex items-center rounded-full px-4 py-2 w-64">
      <InputText
          v-model="searchQuery"
          placeholder="Поиск"
          class="border-none outline-none bg-transparent w-full text-gray-700 placeholder-gray-400"
      />
      <i class="pi pi-filter ml-2 text-gray-500 cursor-pointer"></i>
    </div>
    <div class="flex items-center space-x-4 p-4 rounded-lg">
      <Button
          icon="pi pi-refresh"
          class="p-button-rounded p-button-secondary p-button-outlined"
          @click="refreshTasks"
      />
      <Button icon="pi pi-download" class="p-button-rounded p-button-secondary p-button-outlined" @click="handleDownloadClick"/>
      <Button class="p-button-rounded p-button-secondary p-2 p-button-outlined" @click="toggleUserInfo">
        <i class="pi pi-user text-black"></i>
      </Button>
    </div>

    <div
        v-if="showUserInfo"
        id="user-info"
        class="absolute top-[4.5rem] right-0 w-2/3 h-auto bg-white border border-gray-300 p-4 shadow-lg rounded-lg"
        style="z-index:300; width: 40rem;height: 40rem"
    >
      <div class="flex justify-center mb-4">
        <template v-if="userAvatar">
          <img class="w-40 h-40 rounded-full border-2 border-gray-300" :src="userAvatar" alt="User Avatar">
        </template>
        <template v-else>
          <div class="w-40 h-40 rounded-full border-2 border-gray-300 flex items-center justify-center text-3xl text-gray-500">
            {{ userLetters }}
          </div>
        </template>
      </div>
      <button @click="logout" class="bg-red-500 text-white p-2 rounded absolute top-1 right-1 mt-5 mr-5 flex gap-2 items-center">
        <i class="pi pi-sign-out"></i> Logout
      </button>

      <!-- Поле ФИО -->
      <div class="flex items-center justify-center mb-4">
        <div class="flex items-center justify-center w-4/5">
          <input
              type="text"
              v-model="fullName"
              placeholder="ФИО"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
              :readonly="!isEditingName"
          />
        </div>
        <div class="flex pl-1 items-center justify-center h-full gap-2">
          <i class="pi pi-pencil text-gray-500 cursor-pointer" @click="toggleEditName"></i>
          <i :class="['pi pi-save text-gray-500 cursor-pointer', isEditingName ? '' : 'invisible']" @click="isEditingName ? saveNameChanges() : null"></i>
        </div>
      </div>

      <!-- Поле Должность -->
      <div class="flex items-center justify-center mb-3">
        <div class="flex items-center justify-center w-4/5">
          <input
              type="text"
              v-model="position"
              placeholder="Должность"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
              :readonly="!isEditingPosition"
          />
        </div>
        <div class="flex pl-1 items-center justify-center h-full gap-2">
          <i class="pi pi-pencil text-gray-500 cursor-pointer" @click="toggleEditPosition"></i>
          <i :class="['pi pi-save text-gray-500 cursor-pointer', isEditingPosition ? '' : 'invisible']" @click="isEditingPosition ? savePositionChanges() : null"></i>
        </div>
      </div>

      <div class="flex items-center justify-center mb-3">
        <div class="flex items-center justify-center w-4/5">
          <input
              type="text"
              v-model="registrationDate"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
              readonly
          />
        </div>
        <div class="flex pl-1 items-center justify-center h-full gap-2">
          <i class="pi pi-pencil text-gray-500 cursor-pointer" style="visibility: hidden"></i>
          <i class="pi pi-save text-gray-500 cursor-pointer" style="visibility: hidden"></i>
        </div>
      </div>

      <div class="w-full flex justify-start gap-1" style="margin-left: 6%">
        <span>Роль пользователя: {{ roleUser.toString() }}</span>
      </div>
      <div v-if="roleUser.toString() === 'admin'" class="admin-panel text-center">
        <h2 class="text-red-500">Административная панель</h2>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Доступные вам функции:</h2>
        <ul class="max-w-md space-y-1 text-black-500 list-decimal list-inside dark:text-gray-400 text-start ml-5">
          <li>Создание задачи</li>
          <li>Удаление задачи</li>
          <li>Назначение ответственного за задачу</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
i {
  font-size: 120%;
}
</style>
