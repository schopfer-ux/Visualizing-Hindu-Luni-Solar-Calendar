/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      // Use your custom theme here
      {
        forest: {
          ...require('daisyui/src/theming/themes')['forest'],
          primary: 'violet', // Override the primary color
        },
        fantasy: {
          ...require('daisyui/src/theming/themes')['fantasy'],
          accent: '#8f1402', // Override the primary color
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        sm: ['0.875rem', { lineHeight: '3', fontWeight: '500' }],
        rsm: ['1rem', { lineHeight: '2.5' }],
        rsm_mob: ['0.875rem', { lineHeight: '2' }],
        lg: ['1.125rem', { lineHeight: '2.5' }],
      },
    },
  },
  plugins: [daisyui],
};
