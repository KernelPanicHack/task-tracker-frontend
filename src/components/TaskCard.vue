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
      <div class="modal-content w-2/3 ">
        <span @click="closeModal" class="close">&times;</span>
        <div class="m-5">
          <div>
            <IftaLabel class="mb-5">
              <InputText :v-model="title" inputId="title_update_input" type="text" :placeholder="title" class="w-full"/>
              <label for="title_update_input">Заголовок</label>
            </IftaLabel>
          </div>
          <div>
            <IftaLabel class="mb-5">
              <InputText :v-model="task_body" inputId="task_body_update_input" type="text" :placeholder="task_body" class="w-full"/>
              <label for="task_body_update_input">Описание</label>
            </IftaLabel>
          </div>
          <div>
            <IftaLabel class="mb-5">
              <InputText :v-model="assignee" inputId="task_body_update_input" type="text" :placeholder="assignee" class="w-full"/>
              <label for="task_body_update_input">Исполнитель</label>
            </IftaLabel>
          </div>
          <div class="flex justify-between">
            <button @click="closeModal" class="bg-gray-300 text-white rounded p-2">Отмена</button>
            <button class="bg-blue-500 text-white rounded p-2">Сохранить</button>
          </div>
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
    task_body:{
      type: String,
      required: false,
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
