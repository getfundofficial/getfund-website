/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // GETFund Brand Colors - Ghana Flag Inspired
        'getfund': {
          'primary': '#059669',     // Forest green (main)
          'secondary': '#191825',   // Dark navy for text
          'accent': '#10b981',      // Emerald accent
          'light': '#f0fdf4',       // Light green background
          'gray': '#6c757d',        // Text gray
          'red': '#dc2626',         // Ghana flag red
          'gold': '#f59e0b',        // Ghana flag gold/yellow
          'black': '#1f2937',       // Ghana flag black
        },
        // Override default colors with GETFund theme
        'primary': '#059669',
        'secondary': '#191825',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
