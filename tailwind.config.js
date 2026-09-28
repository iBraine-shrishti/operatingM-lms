/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#f59e0b',
          'orange-hover': '#d97706',
          blue: '#2563eb',
          'blue-light': '#eff6ff',
          'blue-soft': '#dbeafe',
          dark: '#0f172a',
          navy: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['"Geist"', '"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        geist: ['"Geist"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
