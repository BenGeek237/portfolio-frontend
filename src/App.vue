<template>
  <div id="app" class="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-gray-100 transition-colors duration-300">
    <!-- Animation Matrix (uniquement en mode dark) -->
    <MatrixRain v-if="themeStore.isDark" />
    
    <!-- Navigation -->
    <Navbar />
    
    <!-- Contenu des pages (Router) -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import MatrixRain from './components/MatrixRain.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
#app {
  position: relative;
  font-family: 'Fira Code', monospace;
}
</style>