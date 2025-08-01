/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    ".//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}