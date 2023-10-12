const { nextui } = require("@nextui-org/react");
// const { colors } = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  colors: {
    // ...colors,
  },
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({}),
  ],
}

