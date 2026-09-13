// @type {import('tailwindcss').Config} 
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (D99B7F + derived shades) ──
        brand: {
          DEFAULT: "#D99B7F",   // main accent
          dark: "#C4815F",      // hover
          deep: "#A96847",      // active / pressed
          light: "#F3DCCF",     // chips / tint
          ghost: "#FBEEE6",     // very light panels / inputs
          grad1: "#E8B296",     // gradient start
        },
        // ── Warm neutrals to match ──
        ink: {
          DEFAULT: "#3B2B23",   // headings
          muted: "#8A7568",     // secondary text
        },
        line: "#E5D5CB",        // borders
      },
      boxShadow: {
        card: "0 24px 60px rgba(120, 76, 50, 0.18)",
        "btn-glow": "0 8px 20px rgba(217, 155, 127, 0.35)",
      },
    },
  },
  plugins: [],
};