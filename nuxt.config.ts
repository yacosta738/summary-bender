// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: [
    '@nuxtjs/supabase',
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
    '@nuxtjs/color-mode',
    "@nuxt/icon",
    'nuxt-nodemailer',
    "@nuxt/eslint"
  ],
  eslint: {
    // options here
  },
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': {prerender: true}
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/confirm', '/login', '/'],
    },
  },
  nodemailer: {
    from: '"John Doe" <john@doe.com>',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.NODE_ENV === 'production',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },

  },
})
