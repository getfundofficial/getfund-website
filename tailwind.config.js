/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // GETFund Brand Colors - Dark Green Theme
        'getfund': {
          'primary': '#047857',     // Deep emerald (main)
          'secondary': '#052e16',   // Very dark green (text/dark surfaces)
          'accent': '#059669',      // Emerald accent (mid)
          'dark': '#064e3b',        // Dark green for overlays/footer
          'light': '#f0fdf4',       // Light green background
          'gray': '#6c757d',        // Text gray
          'red': '#dc2626',         // Ghana flag red
          'gold': '#f59e0b',        // Ghana flag gold/yellow
          'black': '#1f2937',       // Ghana flag black
        },
        // Override default colors with GETFund theme
        'primary': '#047857',
        'secondary': '#052e16',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      screens: {
        'xs': '475px',      // Extra small devices (large phones)
        '3xl': '1920px',    // Large desktops
        '4xl': '2560px',    // 4K displays / TVs
      },
      fontSize: {
        // Consistent typography scale across all GETFund projects
        'xxs': ['0.625rem', { lineHeight: '1rem' }],        // 10px - tiny labels
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],      // 12px - captions, badges
        'sm': ['0.875rem', { lineHeight: '1.375rem' }],     // 14px - secondary text, form labels
        'base': ['1rem', { lineHeight: '1.625rem' }],       // 16px - body text
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],      // 18px - lead text
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],      // 20px - small headings
        '2xl': ['1.5rem', { lineHeight: '2rem' }],          // 24px - h4
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],    // 30px - h3
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],      // 36px - h2
        '5xl': ['3rem', { lineHeight: '3.5rem' }],          // 48px - h1
        '6xl': ['3.75rem', { lineHeight: '4.25rem' }],      // 60px - hero
        '7xl': ['4.5rem', { lineHeight: '5rem' }],          // 72px - large hero
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      // Subtle rounded corners for a softer, more modern feel
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        // Flatter, more refined shadow system
        'xs': '0 1px 2px rgba(17, 24, 39, 0.04)',
        'sm': '0 1px 2px rgba(17, 24, 39, 0.05), 0 1px 3px rgba(17, 24, 39, 0.06)',
        'DEFAULT': '0 1px 3px rgba(17, 24, 39, 0.06), 0 1px 2px rgba(17, 24, 39, 0.04)',
        'md': '0 4px 6px -1px rgba(17, 24, 39, 0.06), 0 2px 4px -1px rgba(17, 24, 39, 0.04)',
        'lg': '0 10px 15px -3px rgba(17, 24, 39, 0.06), 0 4px 6px -2px rgba(17, 24, 39, 0.04)',
        'xl': '0 20px 25px -5px rgba(17, 24, 39, 0.08), 0 10px 10px -5px rgba(17, 24, 39, 0.03)',
        '2xl': '0 25px 50px -12px rgba(17, 24, 39, 0.15)',
        'soft': '0 2px 8px rgba(17, 24, 39, 0.04)',
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
      },
    },
  },
  plugins: [],
};
