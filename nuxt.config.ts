// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@element-plus/nuxt'],
  app: {
    head: {
      title: '愛崎未来',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ]
    }
  },
  i18n: {
    locales: [
      { code: 'jp', name: '日本語', file: 'jp.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh-tw', name: '繁體中文', file: 'zh-tw.json' },
      { code: 'zh-cn', name: '简体中文', file: 'zh-cn.json' }
    ],
    defaultLocale: 'jp',
  },
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || '',
    jwtSecert: process.env.JWT_SECRET || ''
  },
  css: [
    'element-plus/dist/index.css',
    '@/assets/css/global.css'
  ],
  nitro: {
    publicAssets: [
      { dir: './.data/uploads', baseURL: '/uploads' } 
    ],// 把 .data/uploads 掛成 /uploads API讀寫都存取這個位置
    storage: {
      uploads: { driver: 'fs', base: './.data/uploads' }
    },
    alias: {
      '.prisma/client/default': './app/generated/prisma/default.js'
    },
    externals: {
      trace: false,
      inline: ['@prisma/client'],
    }
  },
})