<script setup lang="ts">
defineProps<{
  msg: string
}>()


import { useTheme } from '../composables/useTheme'
const { isDark, toggle } = useTheme()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      <button @click="isDark = !isDark" class="p-2 bg-gray-200 dark:bg-gray-700 rounded">
        {{ isDark ? '🌙 Dark' : '☀️ Light' }}
      </button>
    </h3>
  </div>
</template>

<style scoped></style>
