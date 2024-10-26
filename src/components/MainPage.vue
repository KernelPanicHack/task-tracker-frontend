<template>
  <div class="main-page h-full flex flex-col w-full overflow-y-hidden">
    <div class="stage-columns flex pt-8 justify-center px-8 w-full" style="gap:10%;">
      <StageColumn
          v-for="(state, index) in states"
          :key="index"
          :title="state.name"
          :isActive="true"
          :stageNumber="state.id"
          :tasks="filteredTasks(state.id)"
          @task-moved="handleTaskMove"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {loadStates} from '@/api/fetchStates.js';
import {loadTasks} from '@/api/fetchTasks.js';
import StageColumn from './StageColumn.vue';

const states = ref([]);
const tasks = ref([]);

onMounted(async () => {
  states.value = await loadStates();
  tasks.value = await loadTasks();
});

// Функция для фильтрации задач по состоянию
const filteredTasks = (stateId) => tasks.value.filter(task => task.tasks_state?.id === stateId);

// Обработчик перемещения задачи
const handleTaskMove = (taskId, newStateId) => {
  // Обновите состояние задачи
  const taskIndex = tasks.value.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.value[taskIndex].tasks_state.id = newStateId; // Обновите состояние задачи
  }
};
</script>
