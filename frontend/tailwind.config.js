/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // Darker, more visible blue (Blue-700)
          hover: "#1E40AF",   // Blue-800
        },
        secondary: {
          DEFAULT: "#047857", // Darker green (Emerald-700)
          hover: "#065F46",   // Emerald-800
        },
        accent: {
          DEFAULT: "#B45309", // Darker amber/orange (Amber-700)
          hover: "#92400E",   // Amber-800
        },
        background: "#F9FAFB",
        surface: "#FFFFFF",
      }
    },
  },
  plugins: [],
}
