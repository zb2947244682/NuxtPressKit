// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      title: '管理员前端',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '管理员前端应用' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    baseURL: '/admin'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api/admin'
    }
  }
})
