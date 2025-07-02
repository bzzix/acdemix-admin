#!/bin/bash

# متغيرات
PROJECT_DIR="/home/bzzix/public_html/acdemix/portal-admin"
APP_NAME="acdemix-admin"

echo "🚀 بدء عملية النشر..."

# الانتقال لمجلد المشروع
cd $PROJECT_DIR

# سحب آخر التحديثات
echo "📥 سحب التحديثات من GitHub..."
git pull origin main

# تثبيت التبعيات
echo "📦 تثبيت التبعيات..."
npm install --production

# بناء المشروع
echo "🔨 بناء المشروع..."
npm run build

# إنشاء مجلد اللوجز إذا لم يكن موجوداً
mkdir -p logs

# إيقاف التطبيق إذا كان يعمل
echo "⏹️ إيقاف التطبيق..."
pm2 stop $APP_NAME 2>/dev/null || true

# تشغيل التطبيق
echo "▶️ تشغيل التطبيق..."
pm2 start ecosystem.config.js --env production

# حفظ إعدادات PM2
pm2 save

# إعداد بدء تلقائي عند إعادة تشغيل الخادم
pm2 startup

echo "✅ تم النشر بنجاح!"
echo "📊 حالة التطبيق:"
pm2 status