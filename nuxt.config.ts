// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [// https://github.com/nuxt-modules/supabase
  '@nuxtjs/supabase', // UI lib (will be soon open sourced)
  '@nuxthq/ui', // https://github.com/nuxt-modules/color-mode
  '@nuxtjs/color-mode'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  ui: {
    colors: {
      primary: 'green',
    },
    icons: ['mdi', 'heroicons', 'heroicons-outline'],
  },
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    },
  },
})