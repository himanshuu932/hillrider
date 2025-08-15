/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"   
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ['Inter', 'sans-serif'],
        mina: ['Mina', 'sans-serif'],
        robotoSlab: ['"Roboto Slab"', 'serif'],
      }
    },
  },
  plugins: [],
}
