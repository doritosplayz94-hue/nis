/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D6D',
        secondary: '#1F2937',
        accent: '#3B82F6'
      }
    },
  },
  plugins: [],
}
