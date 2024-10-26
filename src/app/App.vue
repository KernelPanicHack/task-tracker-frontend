<script setup>
import LoginRegisterPage from "../components/LoginRegisterComponent.vue";
import Header from "../components/Header.vue";
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import UserProfileComponent from "@/components/UserProfileComponent.vue";

</script>

<template>
  <Header />
<!--  <UserProfileComponent/>-->
<main>
  <router-view />
</main>


</template>
