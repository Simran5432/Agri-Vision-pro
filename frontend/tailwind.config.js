/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2fbf5',
          100: '#e1f6e8',
          200: '#c3ebd4',
          300: '#95dbb3',
          400: '#5ec38c',
          500: '#38a76b',
          600: '#288753',
          700: '#236c44',
          800: '#1f5639',
          900: '#1a4731',
        },
        earth: {
          50: '#fbf7f4',
          100: '#f5ebe3',
          200: '#ead5c5',
          300: '#deb89d',
          400: '#d09772',
          500: '#c57d52',
          600: '#b86543',
          700: '#994f37',
          800: '#7d4232',
          900: '#66382c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
