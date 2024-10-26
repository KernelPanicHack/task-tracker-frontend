<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const showUserInfo = ref(false);
const fullName = ref('Дмитрий Пиэйчпи Бэекендович');
const position = ref('Разработчик');
const registrationDate = ref('2023-01-01');
const isEditingName = ref(false);
const isEditingPosition = ref(false);

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
      <Button icon="pi pi-cog" class="p-button-rounded p-button-secondary p-button-outlined" />
      <Button icon="pi pi-download" class="p-button-rounded p-button-secondary p-button-outlined" />
      <Button class="p-button-rounded p-button-secondary p-2 p-button-outlined" @click="toggleUserInfo">
        <i class="pi pi-user text-black"></i>
      </Button>
    </div>
    <div
        v-if="showUserInfo"
        class="absolute top-16 right-4 w-80 bg-white border border-gray-300 p-4 shadow-lg rounded-lg"
        style="z-index:300"
    >
      <div class="flex justify-center mb-4">
        <i class="pi pi-user text-4xl text-gray-700"></i>
      </div>

      <!-- Поле ФИО -->
      <div class="flex items-center mb-3">
        <input
            type="text"
            v-model="fullName"
            placeholder="ФИО"
            class="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            :readonly="!isEditingName"
        />
        <i
            class="pi pi-pencil ml-2 text-gray-500 cursor-pointer"
            @click="toggleEditName"
        ></i>
      </div>
      <button v-if="isEditingName" @click="saveNameChanges" class="mb-3 p-2 bg-blue-500 text-white rounded-md w-4/5">
        Сохранить ФИО
      </button>

      <!-- Поле Должность -->
      <div class="flex items-center mb-3">
        <input
            type="text"
            v-model="position"
            placeholder="Должность"
            class="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            :readonly="!isEditingPosition"
        />
        <i
            class="pi pi-pencil ml-2 text-gray-500 cursor-pointer"
            @click="toggleEditPosition"
        ></i>
      </div>
      <button v-if="isEditingPosition" @click="savePositionChanges" class="mb-3 p-2 bg-blue-500 text-white rounded-md w-4/5">
        Сохранить должность
      </button>

      <input
          type="date"
          v-model="registrationDate"
          class="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
          readonly
      />
    </div>
  </header>
</template>

<style scoped>
</style>
