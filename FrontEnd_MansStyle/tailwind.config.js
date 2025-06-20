/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@rewind-ui/core/**/*.{js,ts,jsx,tsx}", // 👈 Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
}


