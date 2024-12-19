// tailwind.config.js
module.exports = {
    content: [
      "./path/to/your/files/*.html",
      "./path/to/your/files/*.js",
      "./path/to/your/files/*.jsx",
      "./path/to/your/files/*.ts",
      "./path/to/your/files/*.tsx",
    ],
    theme: {
      extend: {
        colors: {
          'custom-color': '#F9F7F3', // Custom color definition
        },
      },
    },
    plugins: [],
  }
  