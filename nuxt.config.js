export default {
  ssr: false,

  target: 'static',

  head: {
    title: 'Searchflix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'swiper/css/swiper.min.css'
  ],

  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/axios', mode: 'client' },
    { src: '@/plugins/v-click-outside', mode: 'client' },
    { src: '@/plugins/v-select', mode: 'client' },
    { src: '@/plugins/vue-country-flag', mode: 'client' },
    { src: '@/plugins/lodash', mode: 'client' },
    { src: '@/plugins/v-body-scroll-lock.js', mode: 'client' },
    { src: '@/plugins/moment.js', mode: 'client' },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt-hero-icons/outline/nuxt',
    '@nuxt-hero-icons/solid/nuxt',
    '@nuxtjs/moment',
    '@nuxtjs/device',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  moment: {
    defaultLocale: 'pl',
    locales: ['pl']
  },

  axios: {
    baseURL: `https://${process.env.X_RAPIDAPI_HOST}`,
  },

  pwa: {
    manifest: {
      name: 'Searchflix',
      short_name: 'Searchflix',
      lang: 'pl',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000'
    }
  },

  build: {
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    }
  },

  env: {
    NODE_ENV: process.env.NODE_ENV,
    X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY,
    X_RAPIDAPI_HOST: process.env.X_RAPIDAPI_HOST
  },
}
