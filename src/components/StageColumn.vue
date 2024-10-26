<template>
  <Card class="flex h-5/6 border-2 border-solid drop-shadow-2xl vw ">
    <template #title>{{ title }}</template>
    <template #content>
      <p class="m-0">

      </p>
    </template>
  </Card>

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
