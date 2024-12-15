/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGold: {
          DEFAULT: "#EBC55A",
          600: "#D4A947",
        },
        customBlue: {
          DEFAULT: "#8FB6D9",
          600: "#F24B78",
        },
        customPink: {
          DEFAULT: "#F2A7CA",
          600: "#103D38",
        },
      },
    },
  },
  plugins: [],
};
