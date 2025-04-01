/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lobster: ["Lobster", "cursive"],
        pacifico: ["Pacifico"],
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'sparkle-1': 'sparkle 1.5s ease-in-out infinite',
        'sparkle-2': 'sparkle 1.5s ease-in-out 0.2s infinite',
        'sparkle-3': 'sparkle 1.5s ease-in-out 0.4s infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'ripple': 'ripple 1s ease-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        sparkle: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1)', opacity: 0.5 },
          '100%': { transform: 'scale(0)', opacity: 0 }
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(1.5)', opacity: 0 }
        },
        'pulse-subtle': {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0.8
          }
        }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro", "cyberpunk"], 
  },
};
