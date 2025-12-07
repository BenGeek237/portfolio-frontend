<template>
  <section id="projects" class="py-20 bg-gray-50 dark:bg-dark-bg">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-matrix-green mb-4">
          Mes Projets
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Découvrez mes réalisations
        </p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-matrix-green mx-auto"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
      </div>

      <div v-else-if="error" class="text-center py-12 text-red-500">
        {{ error }}
      </div>

      <div v-else-if="projects.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="relative overflow-hidden aspect-video bg-gray-200 dark:bg-dark-secondary">
            <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-matrix-green mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="(tech, i) in project.technologies.split(',')" :key="i" class="text-xs px-2 py-1 bg-blue-100 dark:bg-dark-accent text-blue-600 dark:text-neon-cyan rounded">
                {{ tech.trim() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
        Aucun projet pour le moment
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '../services/api'

const projects = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await getProjects()
    projects.value = response.data
  } catch (err) {
    error.value = 'Erreur de chargement'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.project-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s;
}

.dark .project-card {
  background: #151932;
  border-color: #1E2746;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dark .project-card:hover {
  border-color: #00FF41;
  box-shadow: 0 10px 30px rgba(0, 255, 65, 0.2);
}
</style>