/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      },
      colors: {
        customGray: '#eee',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}