<template>
  <div class="flex w-96 min-w-1/4 border-2 border-gray-300 rounded-xl shadow-2xl bg-primary text-center p-4">
    <div class="w-full">
      <h2 class="text-lg font-semibold mb-2 border-b-2 border-black/10" style="white-space: nowrap">{{ title }}</h2>
      <vue-draggable-next
          v-if="filteredTasks.length"
          class="task-list overflow-y-scroll overflow-x-hidden mt-5"
          style="max-height: 40vw; padding-right: 1%"
          :list="filteredTasks"
          @change="onTaskMoved"
      >
        <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :title="task.title"
            :assignee="task.users ? `${task.users.name} ${task.users.surname} ${task.users.patronymic}` : 'Не назначен'"
            :state="task.tasks_state ? task.tasks_state.id : null"
        />
      </vue-draggable-next>
      <div v-else class="text-gray-500">Нет задач</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import TaskCard from "@/components/TaskCard.vue";
import { VueDraggableNext } from "vue-draggable-next";

const props = defineProps({
  title: String,
  stageNumber: Number
});

// Получаем задачи из хранилища
const taskStore = useTaskStore();

// Логируем задачи для проверки
console.log('Tasks:', taskStore.tasks);

// Фильтрация задач по `stageNumber`
const filteredTasks = computed(() => {
  return taskStore.tasks.filter(task => task.tasks_state?.id === props.stageNumber);
});

// Обработчик перемещения задачи
const onTaskMoved = (event) => {
  const movedTask = event.item; // Получаем перемещённую задачу
  const newStateId = props.stageNumber; // Получаем новое состояние (stage number)

  // Обновляем состояние задачи в хранилище
  taskStore.updateTaskState(movedTask.id, newStateId); // Убедитесь, что этот метод работает правильно
};
</script>
