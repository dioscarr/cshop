/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light mode
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB'
        },
        // Dark mode
        'dark-primary': {
          DEFAULT: '#60A5FA',
          dark: '#3B82F6'
        }
      }
    }
  },
  plugins: [],
};
