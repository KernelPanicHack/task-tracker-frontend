<script setup>
import LoginRegisterPage from "../components/LoginRegisterComponent.vue";
import Header from "../components/Header.vue";
import {computed} from 'vue';
import {useRoute} from 'vue-router';

</script>

<template>
  <Header />
<main>
  <router-view />
</main>


</template>
