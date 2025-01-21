/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        python: {
          yellow: '#FFD43B', // Official Python yellow
          blue: '#306998',   // Official Python blue
        },
      },
    },
  },
  plugins: [],
}

