/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'matrix-green': '#00FF41',
        'neon-cyan': '#00D9FF',
        'cyber-purple': '#B026FF',
        'dark-bg': '#0A0E27',
        'dark-secondary': '#151932',
        'dark-accent': '#1E2746',
        
        // Light mode colors
        'light-bg': '#F9FAFB',
        'light-secondary': '#FFFFFF',
        'light-accent': '#E5E7EB',
        'light-text': '#1F2937',
        'light-text-secondary': '#6B7280',
      },
      fontFamily: {
        'mono': ['Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.7s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41',
          },
          '100%': { 
            boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
          },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}