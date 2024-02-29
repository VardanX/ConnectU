/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        modalBg: "rgba(0, 0, 0, 0.5)",
        darkBg: "#3E4042",
        darkLightBg: "rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};
