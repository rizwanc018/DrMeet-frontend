/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': 'hsl(168, 75%, 92%)',
        'primary-200': 'hsl(168, 75%, 82%)',
        'primary-500': 'hsl(168, 75%, 52%)',
        primary: 'hsl(168, 75%, 42%)',
        'primary-600': 'hsl(168, 75%, 32%)',
        'primary-700': 'hsl(168, 75%, 22%)',
        'primary-o': 'hsl(168, 20%, 52%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}