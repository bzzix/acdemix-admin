<template>
  <div v-if="loadingRoute" class="route-loader d-flex align-items-center justify-content-center">
    <span class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status" aria-hidden="true"></span>
  </div>
  <div v-else class="page">
    <!-- Sidebar -->
    <AppSidebar
      :app-logo="appLogo"
      :app-name="appName"
      :current-user="currentUser"
      :menu="sidebarMenu"
      :theme="theme"
    />

    <div class="page-wrapper">
      <!-- Header -->
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <AppHeader :current-user="currentUser" />
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="page-body">
        <div class="container-xl">
          <slot />
        </div>
      </div>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
// استيراد الأدوات والمكونات الأساسية
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useCurrentUser } from '@/composables/useCurrentUser'
import { useSidebarMenu } from '@/composables/useSidebarMenu'
import { useNuxtApp, useRuntimeConfig } from '#app'

// حالة تحميل التنقل بين الصفحات
const loadingRoute = ref(false)

// جلب بيانات المستخدم الحالي
const { currentUser } = useCurrentUser()

// إعدادات التطبيق من config العام
const config = useRuntimeConfig()
const appLogo = typeof config.public?.appLogo === 'string' ? config.public.appLogo : ''
const appName = config.public?.appName || 'App Name'
const theme = config.public?.theme === 'dark' ? 'dark' : 'light'

// توليد قائمة السايدبار ديناميكيًا حسب صلاحيات المستخدم
const { sidebarMenu } = useSidebarMenu(currentUser.value)

// مراقبة التنقل بين الصفحات لإظهار اللودر
onMounted(() => {
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:start', () => {
    loadingRoute.value = true
  })
  nuxtApp.hook('page:finish', () => {
    loadingRoute.value = false
  })
})
</script>

<style scoped>
/* لودر التنقل بين الصفحات */
.route-loader {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.85);
  z-index: 9999;
}

/* تخطيط الصفحة الرئيسي */
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  background: var(--bs-body-bg, #f8fafc);
}

.page-wrapper {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.page-header {
  background: var(--bs-body-bg, #fff);
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.5rem;
}

.page-body {
  flex: 1 1 0%;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
