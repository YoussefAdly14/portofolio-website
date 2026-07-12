/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090B',
        panel: '#111827',
        card: '#18181B',
        hover: '#27272A',
        border: '#2E2E36',
        accent: '#7C3AED',
        accent2: '#6366F1',
        muted: '#71717A'
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        lift: '0 18px 48px rgba(0, 0, 0, 0.24)'
      }
    }
  },
  plugins: []
};
