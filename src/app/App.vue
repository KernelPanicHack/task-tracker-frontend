<script setup>
import LoginRegisterPage from "../components/LoginRegisterComponent.vue";
import Header from "../components/Header.vue";
import {computed} from 'vue';
import {useRoute} from 'vue-router';

</script>

<template>
  <Header />
  <main class="relative w-full flex justify-center">
  <router-view />
</main>


</template>
