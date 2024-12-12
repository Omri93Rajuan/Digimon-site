/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGold: {
          DEFAULT: "#EBC55A", // צבע ברירת מחדל
          600: "#D4A947", // גרסה כהה יותר
        },
        customPink: {
          DEFAULT: "#F2A0BE", // צבע ברירת מחדל
        },
        customGrenn: {
          DEFAULT: " #197352",
          600: "#197500", // צבע ברירת מחדל
        },
      },
    },
  },
  plugins: [],
};
