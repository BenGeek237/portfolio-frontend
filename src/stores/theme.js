import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // État du thème (dark par défaut)
  const isDark = ref(true)
  
  // Initialiser depuis localStorage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  }
  
  // Fonction pour toggle le thème
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }
  
  // Sauvegarder dans localStorage à chaque changement
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    
    // Ajouter/retirer la classe 'dark' sur <html>
    if (newValue) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })
  
  return {
    isDark,
    toggleTheme
  }
})