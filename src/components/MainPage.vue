<template>
  <div class="main-page h-full flex flex-col w-full overflow-y-hidden">
    <div class="stage-columns flex pt-8 justify-center px-8 w-full" style="gap:10%;">
      <StageColumn
          v-for="(state, index) in states"
          :key="state.id"
      :title="state.name"
      :stageNumber="state.id"
      :tasks="filteredTasks(state.id)"
      @task-moved="handleTaskMove"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadStates } from '@/api/fetchStates.js';
import { loadTasks } from '@/api/fetchTasks.js';
import StageColumn from './StageColumn.vue';

const states = ref([]);
const tasks = ref([]);

onMounted(async () => {
  states.value = await loadStates();
  tasks.value = await loadTasks();

  // Перезаписываем tasks.value с использованием JSON.stringify
  tasks.value = tasks.value.map(task => JSON.stringify(task));

  // Логируем результат
  tasks.value.forEach(task => {
    console.log(task);
  });
});



// Функция для фильтрации задач по состоянию
const filteredTasks = (stateId) => {
  const tasksForState = tasks.value.filter(task => task.tasks_state?.id === stateId);
  console.log(tasksForState); // Логируем отфильтрованные задачи
  return tasksForState; // Возвращаем отфильтрованные задачи
};

// Обработчик перемещения задачи
const handleTaskMove = (taskId, newStateId) => {
  const taskIndex = tasks.value.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.value[taskIndex].tasks_state.id = newStateId; // Обновите состояние задачи
    // Здесь можно добавить логику для сохранения изменений на сервере
  }
};
</script>
