/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        krishi: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#ebdcc5',
          300: '#ddc29f',
          400: '#cba374',
          500: '#b6834d',
          600: '#9b673e',
          700: '#7d4e34',
          800: '#67412f',
          900: '#56372b',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(16, 185, 129, 0.08), 0 2px 10px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 14px 40px 0 rgba(16, 185, 129, 0.16), 0 4px 14px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px -5px rgba(34, 197, 94, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
