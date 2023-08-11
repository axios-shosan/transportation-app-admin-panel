/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#03FF3B',
        dark: '#111111',
        'light-dark-1': ' #191919',
        'light-dark-2': '#282828',
        'light-dark-3': '#414141',
        'light-dark-4': '#5E5E5E',
        'light-dark-5': '#7A7A7A',
      },
      // add an animation from right to left
      keyframes: {
        'slide-in-left': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'slide-in-left-1': {
          '0%': {
            transform: 'translateX(200%)',
          },
          '20%': {
            transform: 'translateX(200%)',
          },
          '25%': {
            transform: 'translateX(0%)',
          },
          '45%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(200%)',
          },
          '100%': {
            transform: 'translateX(200%)',
          }
        },
        'slide-in-left-2': {
          '0%': {
            transform: 'translateX(200%)',
          },
          '45%': {
            transform: 'translateX(200%)',
          },
          '50%': {
            transform: 'translateX(0%)',
          },
          '70%': {
            transform: 'translateX(0%)',
          },
          '75%': {
            transform: 'translateX(200%)',
          },
          '100%': {
            transform: 'translateX(200%)',
          }
        },
        'slide-in-left-3': {
          '0%': {
            transform: 'translateX(200%)',
          },
          '70%': {
            transform: 'translateX(200%)',
          },
          '75%': {
            transform: 'translateX(0%)',
          },
          '95%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(200%)',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
      },
      // add animation to the class
      animation: {
        'slide-in-left': 'slide-in-left 0.1s ease-out 0s alternate',
        'slide-in-right': 'slide-in-right 0.1s ease-out 0s infinite alternate',
        'slide-in-left-slow': 'slide-in-left 1s ease-out 0s infinite alternate',
      },
    },
  },
  plugins: [],
}
