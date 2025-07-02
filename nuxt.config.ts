// nuxt.config.ts
export default defineNuxtConfig({
  // 1. تثبيت التوافق بتاريخ ثابت
  compatibilityDate: '2024-11-01',

  // 2. الموديولات
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  // 3. تفعيل DevTools في بيئة التطوير فقط
  devtools: { 
    enabled: process.env.NODE_ENV === 'development' 
  },

  // 4. المتغيرات البيئية
  runtimeConfig: {
    // المتغيرات الخاصة بالخادم (سرية)
    apiSecret: process.env.API_SECRET,
    
    // المتغيرات العامة (متاحة للعميل)
    public: { 
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
      appName: process.env.APP_NAME || 'Admin Panel'
    }
  },

  // 5. ملفات CSS
  css: [
    '@/assets/theme/css/tabler.rtl.min.css',
    '@/assets/theme/css/tabler-flags.rtl.min.css',
    '@/assets/theme/css/tabler-payments.rtl.min.css',
    '@/assets/theme/css/tabler-vendors.rtl.min.css',
    '@/assets/theme/css/demo.rtl.min.css',
    '@/assets/theme/css/custom-rtl.css',
    '@/assets/theme/css/custom.css',
    '@/assets/theme/scss/custom.scss',
    '@/assets/theme/izitoast/css/iziToast.min.css',
  ],

  // 6. إعداد Nuxt Image
  // image: {
  //   // المجالات المسموحة للصور الخارجية
  //   domains: ['images.unsplash.com', 'cdn.example.com'],
  //   // الأحجام المحددة مسبقاً
  //   screens: {
  //     xs: 320,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     xxl: 1536,
  //   },
  //   // تحسين جودة الصور
  //   quality: 80,
  //   // تنسيق افتراضي للصور
  //   format: ['webp', 'jpg'],
  // },

  // 7. إعداد i18n للدعم متعدد اللغات
  i18n: {
    locales: [
      { 
        code: 'ar', 
        name: 'العربية', 
        iso: 'ar-EG', 
        file: 'ar.json', 
        dir: 'rtl' 
      },
      { 
        code: 'en', 
        name: 'English', 
        iso: 'en-US', 
        file: 'en.json', 
        dir: 'ltr' 
      }
    ],
    defaultLocale: 'ar',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'ar',
      alwaysRedirect: false,
      //onlyOnRoot: true,
    },
    vueI18n: '../i18n.config.ts', // استخدم المسار الصحيح من الرووت (مع النقطة)
  },

  // 8. إعدادات التطبيق  npm run dev
  app: {
    // انتقالات الصفحات
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' // تحسين الانتقال
    },
    // انتقالات التخطيط
    layoutTransition: { 
      name: 'layout', 
      mode: 'out-in' 
    },
    // العنوان الافتراضي
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'تطبيق Nuxt',
      meta: [
        { name: 'description', content: 'وصف التطبيق' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      }
    }
  },

  // 9. إعدادات TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  },

  // 10. إعدادات Vite
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/theme/scss/variables.scss" as *;'
        }
      }
    }
  },

  // 11. إعدادات الأمان
  ssr: true, // تفعيل Server-Side Rendering
  
  // 12. إعدادات التجميع
  build: {
    transpile: ['izitoast'] // تجميع مكتبة izitoast
  },

  // 13. إعدادات التطوير
  devServer: {
    port: Number(process.env.DEV_PORT) || 3000,
    host: process.env.DEV_HOST || '0.0.0.0'
  },
  // إعدادات التحسين
  experimental: {
    payloadExtraction: false
  },
})