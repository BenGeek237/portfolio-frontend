<template>
  <section id="skills" class="py-20 bg-white dark:bg-dark-secondary">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-matrix-green mb-4">
          Mes Compétences
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Les technologies que je maîtrise
        </p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-matrix-green mx-auto"></div>
      </div>

      <div v-else-if="skills.length > 0" class="max-w-4xl mx-auto">
        <div v-for="category in categories" :key="category" class="mb-8">
          <h3 class="text-2xl font-bold text-gray-700 dark:text-neon-cyan mb-4">
            {{ category }}
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="skill in getSkillsByCategory(category)" :key="skill.id" class="skill-card">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold text-gray-800 dark:text-matrix-green">{{ skill.name }}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-dark-accent rounded-full h-2">
                <div 
                  class="bg-blue-600 dark:bg-matrix-green h-2 rounded-full transition-all duration-500"
                  :style="{ width: getLevelPercentage(skill.level) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
        Compétences en cours d'ajout
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getSkills } from '../services/api'

const skills = ref([])
const loading = ref(true)

const categories = computed(() => {
  const cats = [...new Set(skills.value.map(s => s.category))]
  return cats
})

const getSkillsByCategory = (category) => {
  return skills.value.filter(s => s.category === category)
}

const getLevelPercentage = (level) => {
  const levels = {
    'debutant': 25,
    'intermediaire': 50,
    'avance': 75,
    'expert': 95
  }
  return levels[level] || 50
}

onMounted(async () => {
  try {
    const response = await getSkills()
    skills.value = response.data
  } catch (err) {
    console.error('Erreur skills:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.skill-card {
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.dark .skill-card {
  background: #0A0E27;
  border-color: #1E2746;
}

.skill-card:hover {
  transform: translateY(-2px);
  border-color: #3b82f6;
}

.dark .skill-card:hover {
  border-color: #00FF41;
}
</style>