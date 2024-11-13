/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-left': '5px 0px 100px 0px rgba(247, 247, 247, 0.5)', 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}