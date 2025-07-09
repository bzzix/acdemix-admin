# Acdemix Admin Portal

لوحة تحكم Nuxt 3 احترافية متعددة اللغات (عربي/إنجليزي) متكاملة مع Laravel API، تدعم RTL، حماية متقدمة، نشر على Apache/WHM مع systemd وملفات إعدادات متقدمة.

---

## بنية المشروع (Project Structure)

```
portal-admin/
│
├── assets/                # ملفات الصور، الأيقونات، الثيمات (SCSS, CSS)
│   └── theme/             # ملفات الثيم المخصصة
│
├── components/            # مكونات واجهة المستخدم (AppSidebar, AppHeader, ...)
│
├── composables/           # دوال Composable (useApi, useAuthService, useCurrentUser, useSidebarMenu)
│
├── layouts/               # قوالب الصفحات (default.vue)
│
├── locales/               # ملفات الترجمة (ar.json, en.json)
│
├── middleware/            # ميدل وير للحماية (auth.global.ts)
│
├── pages/                 # صفحات التطبيق (index, auth/login, users, tenants, ...)
│
├── public/                # ملفات عامة (favicon, robots.txt)
│
├── server/                # إعدادات السيرفر (tsconfig, ...)
│
├── utils/                 # أدوات مساعدة (helpers.ts)
│
├── .env                   # متغيرات البيئة (غير مرفوع)
├── .env.example           # مثال متغيرات البيئة للرفع على GitHub
├── .htaccess              # إعدادات Apache/WHM لإعادة التوجيه وحماية المنافذ
├── ecosystem.config.js    # إعدادات systemd/pm2 لتشغيل Nuxt كخدمة
├── deploy.sh              # سكريبت نشر تلقائي
├── nuxt.config.ts         # إعدادات Nuxt الرئيسية
├── package.json           # تعريف الحزم
└── README.md              # هذا الملف
```

---

## المميزات الرئيسية
- دعم تعدد اللغات (i18n) مع RTL والعربية افتراضية
- حماية متقدمة: فحص التوكن، حماية الدومين، منع الوصول غير المصرح
- فصل منطق المصادقة في Composable مستقل
- سايدبار ديناميكي حسب الصلاحيات وبيانات المستخدم
- رسائل تنبيه احترافية عبر iziToast
- نشر آمن على Apache/WHM مع systemd وملفات .htaccess
- إعدادات theme ديناميكية من السيرفر
- SPA فقط (ssr: false)

---

## النشر على السيرفر (Apache + systemd)

1. **systemd/ecosystem.config.js**
   - إعداد Nuxt ليعمل كخدمة دائمة (pm2 أو systemd)
   - مثال:
     ```bash
     pm2 start ecosystem.config.js
     # أو systemctl start nuxt-admin
     ```
2. **.htaccess**
   - يعيد توجيه كل الطلبات إلى Nuxt على المنفذ 3000
   - يمنع الوصول المباشر للملفات الحساسة
   - مثال:
     ```apache
     RewriteEngine On
     RewriteCond %{SERVER_PORT} 80
     RewriteRule ^index\.php(.*)$ http://127.0.0.1:3000/$1 [P,L]
     RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
     ```
3. **.env**
   - ضع متغيرات البيئة الخاصة بالإنتاج (apiBaseUrl, ALLOWED_HOSTS, ...)
   - لا ترفع هذا الملف، استخدم .env.example

---

## أهم الملفات والدوال
- `composables/useApi.ts` : دوال get/post موحدة لكل استدعاءات API
- `composables/useAuthService.ts` : تسجيل الدخول/الخروج وفحص التوكن
- `composables/useCurrentUser.ts` : جلب بيانات المستخدم الحالي
- `composables/useSidebarMenu.ts` : توليد قائمة السايدبار حسب الصلاحيات
- `layouts/default.vue` : القالب الرئيسي، موثق بالكامل
- `components/AppSidebar.vue` : سايدبار ديناميكي مع زر خروج وتأكيد
- `middleware/auth.global.ts` : حماية جميع الصفحات من الوصول غير المصرح

---

## خطوات التشغيل محليًا
1. انسخ ‎.env.example‎ إلى ‎.env‎ وعدل القيم
2. ثبّت الحزم:
   ```bash
   npm install
   ```
3. شغّل المشروع:
   ```bash
   npm run dev
   ```

---

## ملاحظات أمنية
- لا ترفع ‎.env‎ أبدًا إلى GitHub
- تأكد من ضبط ALLOWED_HOSTS في ‎.env‎ للإنتاج
- استخدم systemd أو pm2 لإدارة الخدمة تلقائيًا

---

## للمساهمة أو الدعم
- كل الكود موثق ومقسم بوضوح
- أي استفسار أو تطوير إضافي: تواصل مع فريق Acdemix

---

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
