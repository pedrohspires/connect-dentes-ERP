/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      },
      colors: {
        paleta: {
          100: "#cbdad5",
          300: "#89a7b1",
          500: "#566981",
          700: "#3a415a",
          900: "#34344e"
        }
      }
    },
  },
  plugins: [],
}