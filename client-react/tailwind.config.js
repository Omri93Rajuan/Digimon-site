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
      },
      customFink: {
        DEFAULT: "#F2A0BE",
      },
    },
  },
  plugins: [],
};
