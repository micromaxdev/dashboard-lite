/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "30vh": "30vh",
        "80vh": "80vh",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
