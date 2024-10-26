<script setup>

</script>

<template>
  <header class="flex justify-around items-center bg-main-color border-b-2/25 backdrop-blur-sm border-gray-300">
    <div class="flex items-center">
      <img src="../assets/logoWebpractik.svg" alt="logo">
    </div>
    <div class="flex items-center rounded-full px-4 py-2 w-64">
      <InputText
          v-model="searchQuery"
          placeholder="Поиск"
          class="border-none outline-none bg-transparent w-full text-gray-700 placeholder-gray-400"
      />
      <i class="pi pi-filter ml-2 text-gray-500 cursor-pointer text-black/80"></i>
    </div>
    <div class="flex items-center space-x-4 p-4 rounded-lg">
      <Button icon="pi pi-cog" severity="contrast" class="p-button-rounded p-button-secondary p-button-outlined " />

      <Button icon="pi pi-download" severity="contrast" class="p-button-rounded p-button-secondary p-button-outlined" />

      <Button severity="contrast" class="p-button-rounded p-button-secondary p-2 p-button-outlined">
        <i class="pi pi-user text-black "></i>
      </Button>
    </div>
  </header>
</template>

<style scoped>

</style>