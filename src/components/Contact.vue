<template>
  <section id="contact" class="py-20 bg-white dark:bg-dark-secondary">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-matrix-green mb-4">
          Contactez-moi
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Une question ? Un projet ? N'hésitez pas à me contacter
        </p>
      </div>

      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Nom</label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-accent rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-matrix-green text-gray-800 dark:text-gray-200 transition-colors"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-accent rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-matrix-green text-gray-800 dark:text-gray-200 transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Sujet</label>
            <input 
              v-model="form.subject" 
              type="text" 
              required
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-accent rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-matrix-green text-gray-800 dark:text-gray-200 transition-colors"
              placeholder="Sujet du message"
            />
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">Message</label>
            <textarea 
              v-model="form.message" 
              required
              rows="5"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-accent rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-matrix-green text-gray-800 dark:text-gray-200 transition-colors resize-none"
              placeholder="Votre message..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            :disabled="sending"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!sending">Envoyer le message</span>
            <span v-else>Envoi en cours...</span>
          </button>

          <p v-if="successMessage" class="text-green-600 dark:text-green-400 text-center">{{ successMessage }}</p>
          <p v-if="errorMessage" class="text-red-600 dark:text-red-400 text-center">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { sendContactMessage } from '../services/api'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  sending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await sendContactMessage(form.value)
    successMessage.value = 'Message envoyé avec succès !'
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (err) {
    errorMessage.value = 'Erreur lors de l\'envoi. Réessayez.'
  } finally {
    sending.value = false
  }
}
</script>