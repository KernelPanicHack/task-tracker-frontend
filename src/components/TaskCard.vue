<template>
  <div class="max-w-sm bg-white rounded-lg shadow-md p-4 border border-gray-300">
    <div class="flex items-center justify-between mb-4">
      <button class="text-gray-600 hover:text-gray-800 text-xl">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <h2 class="text-lg font-semibold text-black text-center flex-1">
        {{ title }}
      </h2>

      <button @click="showModal" class="text-gray-600 hover:text-gray-800 text-xl">
        <i class="pi pi-pencil"></i>
      </button>
    </div>

    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <div class="mb-4">
          <input type="text" placeholder="Поле ввода 1" class="border rounded p-2 w-full" />
        </div>
        <div class="mb-4">
          <input type="text" placeholder="Поле ввода 2" class="border rounded p-2 w-full" />
        </div>
        <div class="mb-4">
          <input type="text" placeholder="Поле ввода 3" class="border rounded p-2 w-full" />
        </div>
        <div class="flex justify-between">
          <button @click="closeModal" class="bg-gray-300 text-white rounded p-2">Отмена</button>
          <button class="bg-blue-500 text-white rounded p-2">Сохранить</button>
        </div>
      </div>
    </div>

    <div class="text-gray-700 text-sm mt-4">
      <span class="font-medium">Исполнитель:</span> {{ assignee }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
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
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>
