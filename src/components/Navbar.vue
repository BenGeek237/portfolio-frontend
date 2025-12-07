<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-light-bg dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-matrix-green/20 transition-colors duration-300">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo / Nom -->
        <RouterLink to="/" class="text-2xl font-bold text-gray-800 dark:text-matrix-green hover:text-blue-600 dark:hover:text-neon-cyan transition-colors">
          <span class="dark:text-glow">&lt;MB/&gt;</span>
        </RouterLink>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="nav-link"
            active-class="text-blue-600 dark:text-matrix-green"
          >
            Accueil
          </RouterLink>
          <a href="#projects" class="nav-link">Projets</a>
          <a href="#skills" class="nav-link">Compétences</a>
          <a href="#blog" class="nav-link">Blog</a>
          <a href="#contact" class="nav-link">Contact</a>
          
          <!-- Toggle Dark/Light -->
          <button
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg bg-gray-200 dark:bg-dark-secondary hover:bg-gray-300 dark:hover:bg-dark-accent transition-all duration-300"
            :title="themeStore.isDark ? 'Mode clair' : 'Mode sombre'"
          >
            <!-- Icon Sun (mode light actif) -->
            <svg v-if="!themeStore.isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            
            <!-- Icon Moon (mode dark actif) -->
            <svg v-else class="w-5 h-5 text-matrix-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>

        <!-- Bouton Menu Mobile -->
        <div class="flex items-center gap-3 md:hidden">
          <!-- Toggle Mobile -->
          <button
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg bg-gray-200 dark:bg-dark-secondary transition-colors"
          >
            <svg v-if="!themeStore.isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5 text-matrix-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-800 dark:text-matrix-green hover:text-blue-600 dark:hover:text-neon-cyan transition-colors"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden mt-4 pb-4 space-y-4 animate-fade-in"
      >
        <a href="#projects" @click="mobileMenuOpen = false" class="block nav-link">Projets</a>
        <a href="#skills" @click="mobileMenuOpen = false" class="block nav-link">Compétences</a>
        <a href="#blog" @click="mobileMenuOpen = false" class="block nav-link">Blog</a>
        <a href="#contact" @click="mobileMenuOpen = false" class="block nav-link">Contact</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const mobileMenuOpen = ref(false)
const themeStore = useThemeStore()
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-matrix-green 
         transition-all duration-300 font-medium relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>