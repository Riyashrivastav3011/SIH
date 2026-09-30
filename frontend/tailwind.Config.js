/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        rail: {
          50: "#eff6ff",
          600: "#0f365c",
          700: "#0a2540",
          800: "#081d33",
        },

        brand: "#0f62fe",
        success: "#0e8a3c",
        warning: "#c28200",
        danger: "#d92d20",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },

  plugins: [],
};