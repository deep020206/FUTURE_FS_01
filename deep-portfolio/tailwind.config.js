/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0f',
          light: '#f8fafc',
        },
        primary: {
          DEFAULT: '#a259ff',
        },
        text: {
          DEFAULT: '#ffffff',
          muted: '#b0b3b8',
        },
      },
    },
  },
  plugins: [],
} 