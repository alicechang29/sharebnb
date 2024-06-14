/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,html}"],
  plugins: [require('@tailwindcss/forms'),
  require('tailwindcss'),
  require('autoprefixer')
  ],

}

