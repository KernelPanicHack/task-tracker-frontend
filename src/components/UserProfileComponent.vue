<template>
  <div class="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-purple-100 z-50">
    <div class="text-2xl font-bold text-black">
      <span>web praktik</span>
    </div>

    <div class="flex items-center bg-white rounded-full px-3 py-1 border border-gray-300">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Поиск"
          class="w-full border-none outline-none text-gray-700 placeholder-gray-400 px-2 py-1 rounded-full"
      />
      <i class="pi pi-filter text-gray-500 text-lg ml-2"></i>
    </div>

    <div class="flex items-center space-x-4">
      <i class="pi pi-download text-2xl text-black cursor-pointer"></i>
      <i class="pi pi-user text-2xl text-black cursor-pointer" @click="toggleUserInfo"></i>
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
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const showUserInfo = ref(false);
    const fullName = ref('Иванов Иван Иванович');
    const position = ref('Разработчик');
    const registrationDate = ref('2023-01-01');

    const toggleUserInfo = () => {
      showUserInfo.value = !showUserInfo.value;
    };

    return {
      searchQuery,
      showUserInfo,
      fullName,
      position,
      registrationDate,
      toggleUserInfo,
    };
  },
};
</script>
