<script setup>
import {ref, onMounted} from 'vue';
import {logout} from "@/api/logout.js";
import {getUserData} from '@/api/fetchUser.js'; // Импортируйте вашу функцию






const searchQuery = ref('');
const showUserInfo = ref(false);
const fullName = ref('');
const position = ref('');
const registrationDate = ref('');
const isEditingName = ref(false);
const isEditingPosition = ref(false);
const userAvatar = ref('');
const userLetters = ref('');
onMounted(async () => {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const userData = await getUserData(userId);
    console.log(userData);

    // Проверьте структуру данных, возвращаемых fetchUser
    if (userData) {
      fullName.value = userData.fullName || ''; // Установка ФИО
      position.value = userData.specialization || ''; // Установка должности
      registrationDate.value = userData.date_of_registration || ''; // Установка даты регистрации
      if (userData.avatar_path) {
        userAvatar.value = userData.avatar_path; // Установка аватара из пути
      } else {
        // Если путь недоступен, создаем строку из первых букв имени и фамилии
        userLetters.value = `${userData.name.charAt(0)}${userData.surname.charAt(0)}`.toUpperCase();
      }

    } else {
      console.error('No user data returned');
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
});


const toggleUserInfo = () => {
  showUserInfo.value = !showUserInfo.value;
};

const toggleEditName = () => {
  isEditingName.value = !isEditingName.value;
};

const toggleEditPosition = () => {
  isEditingPosition.value = !isEditingPosition.value;
};

const saveNameChanges = () => {
  // Логика сохранения изменений для ФИО
  isEditingName.value = false;
};

const savePositionChanges = () => {
  // Логика сохранения изменений для должности
  isEditingPosition.value = false;
};
</script>

<template>
  <header class="flex justify-around items-center bg-main-color">
    <div class="flex items-center">
      <img src="../assets/logoWebpractik.svg" alt="logo">
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
      <Button icon="pi pi-cog" class="p-button-rounded p-button-secondary p-button-outlined"/>
      <Button icon="pi pi-download" class="p-button-rounded p-button-secondary p-button-outlined"/>
      <Button class="p-button-rounded p-button-secondary p-2 p-button-outlined" @click="toggleUserInfo">
        <i class="pi pi-user text-black"></i>
      </Button>
    </div>
    <div
        v-if="showUserInfo"
        class="absolute top-[4.5rem] right-0 w-2/3 h-auto bg-white border border-gray-300 p-4 shadow-lg rounded-lg"
        style="z-index:300; width: 40rem;height: 40rem"
    >
      <div class="flex justify-center mb-4">
        <template v-if="userAvatar">
          <img class="w-40 h-40 rounded-full border-2 border-gray-300"
               :src="userAvatar"
               alt="User Avatar">
        </template>
        <template v-else>
          <div class="w-40 h-40 rounded-full border-2 border-gray-300 flex items-center justify-center text-3xl text-gray-500">
            {{ userLetters }}
          </div>
        </template>
      </div>
      <button @click="logout" class="bg-red-500 text-white p-2 rounded absolute top-1 right-1">
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
          <i
              class="pi pi-pencil text-gray-500 cursor-pointer"
              @click="toggleEditName"
          ></i>
          <i
              :class="['pi pi-save text-gray-500 cursor-pointer', isEditingName ? '' : 'invisible']"
              @click="isEditingName ? saveNameChanges() : null"
          ></i>
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
          <i
              class="pi pi-pencil text-gray-500 cursor-pointer"
              @click="toggleEditPosition"
          ></i>
          <i
              :class="['pi pi-save text-gray-500 cursor-pointer', isEditingPosition ? '' : 'invisible']"
              @click="isEditingPosition ? savePositionChanges() : null"
          ></i>
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
          <i
              class="pi pi-pencil text-gray-500 cursor-pointer"
              :style="{ visibility: isEditingDate ? 'visible' : 'hidden' }"
              @click="toggleEditDate"
          ></i>
          <i
              :style="{ visibility: isEditingDate ? 'visible' : 'hidden' }"
              @click="saveDateChanges"
              class="pi pi-save text-gray-500 cursor-pointer"
          ></i>
        </div>
      </div>


    </div>
  </header>
</template>

<style scoped>
i{
  font-size: 120%;
}
</style>
