import axios from 'axios'

// URL de base de votre API Django
const API_BASE_URL = 'http://127.0.0.1:8000/api/'

// Instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ========== PORTFOLIO API ==========

// Récupérer tous les projets
export const getProjects = () => api.get('projects/')

// Récupérer les projets mis en avant
export const getFeaturedProjects = () => api.get('projects/featured/')

// Récupérer un projet par ID
export const getProject = (id) => api.get(`projects/${id}/`)

// Récupérer toutes les compétences
export const getSkills = () => api.get('skills/')

// Envoyer un message de contact
export const sendContactMessage = (data) => api.post('contact/', data)

// ========== BLOG API ==========

// Récupérer tous les articles
export const getBlogPosts = () => api.get('blog/')

// Récupérer un article par slug
export const getBlogPost = (slug) => api.get(`blog/${slug}/`)

// Récupérer les articles mis en avant
export const getFeaturedBlogPosts = () => api.get('blog/featured/')

// Récupérer les articles par catégorie
export const getBlogPostsByCategory = (categorySlug) => 
  api.get(`blog/category/${categorySlug}/`)

// Récupérer toutes les catégories
export const getCategories = () => api.get('categories/')

// Récupérer tous les tags
export const getTags = () => api.get('tags/')

// Récupérer les commentaires d'un article
export const getComments = (postSlug) => 
  api.get(`comments/?post=${postSlug}`)

// Ajouter un commentaire
export const addComment = (data) => api.post('comments/', data)

export default api