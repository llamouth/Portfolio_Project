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
      keyframes: {
        dimlight: {
          "0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92%": {
            color: "#1A1A26",
            boxShadow: "none",
          },
          "18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100%": {
            color: "#fff",
            textShadow: "0 0 10px #232234",
          },
        },
      },
      animation: {
        dimlight: "dimlight 5s infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".box-reflect": {
          "-webkit-box-reflect": "below 1px linear-gradient(transparent, #0004)",
        },
      });
    },
  ],
}

