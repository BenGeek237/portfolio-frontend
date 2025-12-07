<template>
  <section id="blog" class="py-20 bg-gray-50 dark:bg-dark-bg">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-matrix-green mb-4">
          Mon Blog
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Articles et tutoriels sur le développement
        </p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-matrix-green mx-auto"></div>
      </div>

      <div v-else-if="posts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in posts" :key="post.id" class="blog-card">
          <div v-if="post.cover_image" class="aspect-video bg-gray-200 dark:bg-dark-secondary overflow-hidden">
            <img :src="post.cover_image" :alt="post.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span v-if="post.category" class="text-xs px-2 py-1 bg-blue-100 dark:bg-dark-accent text-blue-600 dark:text-neon-cyan rounded">
                {{ post.category.name }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ post.read_time }} min de lecture
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-matrix-green mb-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(post.published_at) }}
              </span>
              <a href="#" class="text-blue-600 dark:text-matrix-green hover:underline text-sm font-semibold">
                Lire plus →
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
        Aucun article pour le moment
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBlogPosts } from '../services/api'

const posts = ref([])
const loading = ref(true)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  try {
    const response = await getBlogPosts()
    posts.value = response.data.slice(0, 6)
  } catch (err) {
    console.error('Erreur blog:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.blog-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s;
}

.dark .blog-card {
  background: #151932;
  border-color: #1E2746;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dark .blog-card:hover {
  border-color: #00FF41;
  box-shadow: 0 10px 30px rgba(0, 255, 65, 0.2);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>