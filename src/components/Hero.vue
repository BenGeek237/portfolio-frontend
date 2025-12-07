<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <div class="container mx-auto px-6 z-10">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Prompt Terminal Style (uniquement en dark mode) -->
        <div v-if="themeStore.isDark" class="mb-8 text-left inline-block">
          <p class="text-matrix-green font-mono text-sm mb-2">
            <span class="text-neon-cyan">guest@portfolio</span>:<span class="text-cyber-purple">~</span>$ whoami
          </p>
        </div>

        <!-- Nom avec animation typing -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span class="text-blue-600 dark:text-matrix-green dark:text-glow typing-animation">
            {{ displayedName }}<span class="cursor">|</span>
          </span>
        </h1>

        <!-- Titre / Profession avec texte rotatif -->
        <div class="text-xl md:text-3xl text-gray-700 dark:text-neon-cyan mb-8 font-light min-h-[40px]">
          <span v-if="themeStore.isDark" class="inline-block animate-float">{{ '>' }}</span>
          <span class="ml-2">{{ currentRole }}</span>
        </div>

        <!-- Technologies -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <span 
            v-for="tech in technologies" 
            :key="tech"
            class="tech-badge"
          >
            {{ tech }}
          </span>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projects" 
            class="btn-primary group"
          >
            <span>Voir mes projets</span>
            <svg class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          
          <a 
            href="#blog" 
            class="btn-secondary group"
          >
            <span>Lire mon blog</span>
            <svg class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </a>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#projects" class="text-blue-600 dark:text-matrix-green opacity-70 hover:opacity-100 transition-opacity">
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
            <p class="text-xs mt-2">Scroll</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Grille cyberpunk en arrière-plan (uniquement dark mode) -->
    <div v-if="themeStore.isDark" class="cyber-grid"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const fullName = 'MAMOUDOU BIA'
const displayedName = ref('')
const technologies = ['Python', 'Django', 'Vue.js', 'Tailwind CSS', 'PostgreSQL', 'Git']

// Textes rotatifs pour "Je suis..."
const roles = [
  'Développeur Full Stack',
  'Passionné d\'IA',
  'Créateur de contenu',
  'Développeur Web'
]
const currentRole = ref(roles[0])
let roleIndex = 0
let roleInterval = null

// Animation typing pour le nom
onMounted(() => {
  let index = 0
  const typingInterval = setInterval(() => {
    if (index < fullName.length) {
      displayedName.value += fullName[index]
      index++
    } else {
      clearInterval(typingInterval)
    }
  }, 150)
  
  // Animation de rotation des rôles
  roleInterval = setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length
    currentRole.value = roles[roleIndex]
  }, 3000) // Change toutes les 3 secondes
})

onUnmounted(() => {
  if (roleInterval) {
    clearInterval(roleInterval)
  }
})
</script>

<style scoped>
/* Animation du curseur clignotant */
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Badges de technologies */
.tech-badge {
  @apply px-4 py-2 bg-white dark:bg-dark-secondary 
         border border-gray-300 dark:border-matrix-green/30 
         text-gray-700 dark:text-matrix-green rounded-lg text-sm font-mono
         hover:border-blue-500 dark:hover:border-matrix-green 
         hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-matrix-green/30
         transition-all duration-300 cursor-default;
}

.tech-badge:hover {
  transform: translateY(-2px);
}

/* Grille cyberpunk en arrière-plan */
.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

/* Animation de float pour la flèche */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}
</style>