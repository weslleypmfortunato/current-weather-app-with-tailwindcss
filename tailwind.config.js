/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  content: [],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        rose: colors.rose,
        'mainblue': '#0b192e', 
      }
    },
  },
  plugins: [],
}

