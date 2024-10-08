const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F7F7F7",
        primary: "#222222",
        accent: "#34495E",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
