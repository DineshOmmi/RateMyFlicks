/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#edf2f4",
        'secondary': "#09101c",
        'shadow':'#84888E',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
