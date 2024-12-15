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
        customPink: {
          DEFAULT: "#F2A0BE",
          600: "#F24B78",
        },
        customGrenn: {
          DEFAULT: " #197352",
          600: "#197500",
        },
      },
    },
  },
  plugins: [],
};
