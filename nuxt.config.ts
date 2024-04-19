// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxt/ui'],
  ui: {
    safelistColors: ['gray']
  },
  colorMode: {
    preference: 'dark'
  },
  //  app: {
  //   baseURL: process.env.NODE_ENV === 'production' ? '/thesis2024/' : '/',
  //   buildAssetsDir: '/static/'
  // }


})
