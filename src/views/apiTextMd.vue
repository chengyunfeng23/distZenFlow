<template>
    <apiText :mdFilePath="'dist/vue/README.md'"></apiText>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import apiText from './apiText.vue';
</script>