/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {}, // Customize your theme here
  },
  plugins: [require('@tailwindcss/forms')],

}

