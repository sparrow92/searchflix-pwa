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
        }
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
