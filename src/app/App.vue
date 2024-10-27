<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from "../components/Header.vue";

const route = useRoute();

// Определяем, нужно ли показывать хэдер
const showHeader = computed(() => {
  return !(route.name === 'LogReg' || route.name === 'AuthPage');
});
</script>

<template>
  <div>
    <Header v-if="showHeader" />
    <main class="relative w-full flex justify-center mt-5">
      <router-view />
    </main>
  </div>
</template>
