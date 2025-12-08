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
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '475px',      // Extra small devices (large phones)
        '3xl': '1920px',    // Large desktops
        '4xl': '2560px',    // 4K displays / TVs
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      // Remove all rounded corners from the entire website
      borderRadius: {
        'none': '0',
        'sm': '0',
        'DEFAULT': '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '0',
      },
    },
  },
  plugins: [],
};
