<template>
  <div class="max-w-sm bg-white rounded-lg shadow-md p-4 border border-gray-300">
    <div class="flex items-center justify-between mb-4">
      <button class="text-gray-600 hover:text-gray-800 text-xl">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <h2 class="text-lg font-semibold text-black text-center flex-1">
        {{ title }}
      </h2>

      <button class="text-gray-600 hover:text-gray-800 text-xl">
        <i class="pi pi-pencil"></i>
      </button>
    </div>

    <div class="text-gray-700 text-sm mt-4">
      <span class="font-medium">Исполнитель:</span> {{ assignee }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: false,
    },
    state: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style scoped>
/* Вы можете добавить дополнительные стили при необходимости */
</style>
