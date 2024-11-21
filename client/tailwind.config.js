/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}',
    './node_modules/preline/preline.js'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sam': ['"Erica One"', 'cursive'],
      'urbanist': ['"Urbanist"', 'cursive'],
    },
    colors: { 
      navblue: '#AEB9C7',
      'black-variant': 'black',
    },
    },

    plugins: [require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('@tailwindcss/typography'),
    ],



};