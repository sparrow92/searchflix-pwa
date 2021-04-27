const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],

  darkMode: false,

  theme: {
    container: {
      center: true,
    },

    extend: {
      colors: {
        red: {
          'DEFAULT': '#db202c',
        },
        gray: colors.trueGray,
      },

      backgroundImage: theme => ({
        'searchflix': "url('~assets/images/background.jpg')",
      })
    }
  },

  variants: {
    extend: {},
  },
  
  plugins: [],
}
