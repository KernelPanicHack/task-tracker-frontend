<template>
  <div class="flex h-5/6 w-96 min-w-1/4 border-2 border-gray-300 rounded-xl shadow-2xl bg-primary text-center p-4">
    <div class="w-full">
      <h2 class="text-lg font-semibold mb-2 border-b-2 border-black/10" style="white-space: nowrap">{{ title }}</h2>
      <p class="m-0">
        Ваш текст здесь
      </p>
    </div>
  </div>
</template>



<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  stageNumber: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>

</style>
