<template>
  <div class="flex h-5/6 w-96 min-w-1/4 border-2 border-gray-300 rounded-xl shadow-2xl bg-primary text-center p-4">
    <div class="w-full">
      <h2 class="text-lg font-semibold mb-2 border-b-2 border-black/10" style="white-space: nowrap">{{ title }}</h2>
      <div v-if="tasks && tasks.length" class="task-list">
        <TaskCard v-for="task in tasks" :key="task.id" :title="task.title" :assignee="task.assignee" :state="task.tasks_state.id" />
      </div>
      <div v-else class="text-gray-500">Нет задач</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import TaskCard from "@/components/TaskCard.vue";

const props = defineProps({
  title: String,
  tasks: Array,
  isActive: Boolean,
  stageNumber: Number,
});
</script>
