<template>
  <div id="app" class="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-gray-100 transition-colors duration-300">
    <MatrixRain v-if="themeStore.isDark" />
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import MatrixRain from './components/MatrixRain.vue'
import Footer from './components/Footer.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
#app {
  position: relative;
  font-family: 'Fira Code', monospace;
}
</style>