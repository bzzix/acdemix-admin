<template>
  <div>

    <!-- لودر التنقل بين الصفحات -->
    <div v-if="loadingRoute" class="route-loader d-flex align-items-center justify-content-center">
      <span class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status" aria-hidden="true"></span>
    </div>

    <!-- لودر تحميل بيانات المستخدم -->
    <div v-else-if="loadingUser" class="user-loader d-flex align-items-center justify-content-center">
      <div class="text-center">
        <span class="spinner-border text-primary mb-3" style="width:2.5rem;height:2.5rem;" role="status" aria-hidden="true"></span>
        <div class="fw-bold">جاري تحميل المستخدم...</div>
      </div>
    </div>

    <!-- التخطيط الرئيسي -->
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

  </div>

</template>

<script setup lang="ts">
// استيراد الأدوات والمكونات الأساسية
import { ref, onMounted, computed } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useCurrentUser } from '@/composables/useCurrentUser'
import { useSidebarMenu } from '@/composables/useSidebarMenu'
import { useNuxtApp, useRuntimeConfig } from '#app'

// حالة تحميل التنقل بين الصفحات
const loadingRoute = ref(false)

// جلب بيانات المستخدم الحالي
const { currentUser, fetchCurrentUser, loadingUser } = useCurrentUser()

onMounted(() => {
  fetchCurrentUser()

  // مراقبة التنقل بين الصفحات لإظهار اللودر
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:start', () => {
    loadingRoute.value = true
  })
  nuxtApp.hook('page:finish', () => {
    loadingRoute.value = false
  })
})

// إعدادات التطبيق من config العام
const config = useRuntimeConfig()
const appLogo = typeof config.public?.appLogo === 'string' ? config.public.appLogo : ''
const appName = config.public?.appName || 'App Name'
const theme = config.public?.theme === 'dark' ? 'dark' : 'light'

// توليد قائمة السايدبار ديناميكيًا حسب صلاحيات المستخدم
const { sidebarMenu } = useSidebarMenu(computed(() => currentUser.value))
</script>

<style scoped>
/* لودر التنقل بين الصفحات */
.route-loader {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.85);
  z-index: 9999;
}

/* لودر تحميل المستخدم */
.user-loader {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.9);
  z-index: 9998;
  font-size: 1.2rem;
  color: #333;
}
</style>
