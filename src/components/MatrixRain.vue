<template>
  <div class="matrix-rain">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId = null

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  const fontSize = 14
  const columns = canvas.value.width / fontSize
  const drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  const matrix = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  const chars = matrix.split('')

  function draw() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)'
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

    // Texte CYAN
    ctx.fillStyle = '#00E5FF'
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      const x = i * fontSize
      const y = drops[i] * fontSize

      ctx.fillText(text, x, y)

      if (y > canvas.value.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()

  const handleResize = () => {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  })
})
</script>

<style scoped>
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.15;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>