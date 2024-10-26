<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const showUserInfo = ref(false);
const fullName = ref('Дмитрий Пиэйчпи Бэекендович');
const position = ref('Разработчик');
const registrationDate = ref('2023-01-01');

const toggleUserInfo = () => {
  showUserInfo.value = !showUserInfo.value;
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
    >
      <div class="flex justify-center mb-4">
        <i class="pi pi-user text-4xl text-gray-700"></i>
      </div>
      <input
          type="text"
          v-model="fullName"
          placeholder="ФИО"
          class="w-full mb-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
      />
      <input
          type="text"
          v-model="position"
          placeholder="Должность"
          class="w-full mb-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
      />
      <input
          type="date"
          v-model="registrationDate"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
      />
    </div>
  </header>
</template>

<style scoped>
/* Добавьте стили по необходимости */
</style>
