/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}',
    './node_modules/preline/preline.js'],
  darkMode: 'dark',
  theme: {
    container: {
      padding: '1rem',
    },
    fontFamily: {
      'sam': ['"Erica One"', 'cursive'],
      'urbanist': ['"Urbanist"', 'cursive'],
    },
    // colors: { 

    //   'black-variant': 'black',
    // },
  },

  plugins: [require('@tailwindcss/forms'),
  require('preline/plugin'),
  require('@tailwindcss/typography'),
  ],



}; 