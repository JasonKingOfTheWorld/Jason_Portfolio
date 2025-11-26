/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: '#22c55e',
        secondary: '#10b981',
        neo: {
          bg: '#010301',
          card: 'rgba(34, 197, 94, 0.03)',
          glass: 'rgba(1, 3, 1, 0.8)',
          border: 'rgba(34, 197, 94, 0.2)',
        }
      }
    },
  },
  plugins: [],
}