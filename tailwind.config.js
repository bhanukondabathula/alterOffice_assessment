// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look for classes in all JS/TS/JSX/TSX files in the src folder
    "./public/index.html"         // Include index.html if using class names there
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
