<template>
  <div class="main-page h-full flex flex-col ">
    <div class="stage-columns gap-10 flex p-8 flex-grow w-full">
      <StageColumn
          v-for="(state, index) in states"
          :key="index"
          :title="state.name"
          :isActive="true"
          :stageNumber="state.id"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadStates } from '@/api/fetchStates.js';
import StageColumn from './StageColumn.vue';

const states = ref([]); // Реактивное свойство для массива объектов

onMounted(async () => {
  states.value = await loadStates();
  console.log(states.value); // Проверка структуры данных
});
</script>

<style scoped>
.main-page {
  height: 100vh; /* Высота контейнера на весь экран */
}

.stage-columns {
  flex-grow: 1; /* Занимает оставшееся пространство */
  display: flex; /* Убедитесь, что внутри используете Flexbox для StageColumn */
  flex-direction: row; /* Располагаем элементы по горизонтали */
}
</style>
