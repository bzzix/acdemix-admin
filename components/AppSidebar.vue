<template>
  <aside
    class="navbar navbar-vertical navbar-expand-lg"
    :class="props.theme === 'dark' ? '' : 'navbar-transparent'"
    :data-bs-theme="props.theme === 'dark' ? 'dark' : null"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebar-menu"
        aria-controls="sidebar-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark">
        <NuxtLink to="/">
          <template v-if="props.appLogo">
            <img :src="props.appLogo" width="110" height="32" :alt="props.appName" class="navbar-brand-image" style="width: 100px; height:auto" />
          </template>
          <template v-else>
            {{ props.appName }}
          </template>
        </NuxtLink>
      </h1>
      <div class="navbar-nav flex-row d-lg-none">
        <div class="nav-item dropdown">
          <template v-if="user">
            <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
              <span class="avatar avatar-sm" :style="user.profile_photo_url ? `background-image: url('${user.profile_photo_url}')` : ''">
                <svg v-if="!user.profile_photo_url" xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path></svg>
              </span>
              <div class="d-none d-xl-block ps-2">
                <div>{{ user.name }}</div>
                <div class="mt-1 small text-muted">{{ user.email }}</div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <NuxtLink to="/settings/profile" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-question" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
                {{ $t('Profile') }}
              </NuxtLink>
              <NuxtLink to="/settings" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                {{ $t('Settings') }}
              </NuxtLink>
              <NuxtLink v-if="hasPermission('admin_view')" to="/" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v8h-6z" /><path d="M4 16h6v4h-6z" /><path d="M14 12h6v8h-6z" /><path d="M14 4h6v4h-6z" /></svg>
                {{ $t('Dashboard') }}
              </NuxtLink>
              <div class="dropdown-divider"></div>
              <button class="btn dropdown-item" @click="logout" style="gap: 3px;justify-content: flex-start;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-1"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                {{ $t('Log Out') }}
              </button>
            </div>
          </template>
          <template v-else>
            <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
              <span class="avatar avatar-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path></svg>
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <NuxtLink to="/auth/login" class="dropdown-item">{{ $t('Login') }}</NuxtLink>
              <NuxtLink to="/auth/register" class="dropdown-item">{{ $t('Register') }}</NuxtLink>
            </div>
          </template>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <template v-for="item in props.menu" :key="item.key">
            <SidebarMenuItem
              :item="item"
              :current-route="activeRoute"
              :user="props.user"
              @logout="logout"
            />
          </template>
          <!-- زر تسجيل الخروج الثابت -->
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="javascript:void(0)" style="color: red" @click.prevent="confirmLogout">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <svg style="color: red" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/><path d="M9 12h12l-3 -3"/><path d="M18 15l3 -3"/></svg>
              </span>
              <span class="nav-link-title">
                <b>{{ $t('Log Out') }}</b>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthService } from '@/composables/useAuthService'
import SidebarMenuItem from './SidebarMenuItem.vue'

// اجعل الثيم prop وليس ref داخلي
const props = defineProps({
  theme: { type: String, default: 'dark' },
  appLogo: { type: String, default: '' },
  appName: { type: String, default: 'App Name' },
  menu: { type: Array, default: () => [] },
  currentUser: { type: Object, default: null }
})

// بيانات المستخدم
const { logout: doLogout } = useAuthService()
const user = computed(() => props.currentUser)
const permissions = computed(() => user.value?.permissions || [])

// دالة فحص الصلاحية محلياً بناءً على بيانات المستخدم
function hasPermission(permission) {
  if (!permissions.value || !Array.isArray(permissions.value)) return false
  return permissions.value.includes(permission)
}

const router = useRouter()
const route = useRoute()
const activeRoute = computed(() => route.name)

const { t } = useI18n()

const fetchUser = async () => {
  const u = await getCurrentUser()
  user.value = u
  permissions.value = u?.permissions || []
  // يمكن جلب appLogo/appName من إعدادات السيرفر أو state
}

const logout = async () => {
  await doLogout()
  router.push('/auth/login')
}

const confirmLogout = async () => {
  if (process.client) {
    const iziToastImport = await import('izitoast')
    const izi = iziToastImport?.default || iziToastImport
    if (izi && typeof izi.question === 'function') {
      izi.question({
        timeout: 0,
        close: false,
        overlay: true,
        displayMode: 1,
        id: 'logout-confirm',
        zindex: 999,
        title: t('تأكيد'),
        message: t('هل أنت متأكد أنك تريد تسجيل الخروج؟'),
        position: 'center',
        rtl: true,
        buttons: [
          [
            '<button><b>' + t('نعم، سجل الخروج') + '</b></button>',
            async function (instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              await logout()
            },
            true
          ],
          [
            '<button>' + t('إلغاء') + '</button>',
            function (instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
            }
          ]
        ]
      })
    } else {
      // fallback بدون iziToast
      if (confirm(t('هل أنت متأكد أنك تريد تسجيل الخروج؟'))) {
        await logout()
      }
    }
  } else {
    await logout()
  }
}

// fetchUser() // لم يعد ضرورياً هنا إذا كان user يُمرر من الأعلى
</script>

<style scoped>
.navbar-vertical {
  min-height: 100vh;
  /* تخصيصات إضافية */
}
.navbar-brand-image {
  max-width: 110px;
  height: auto;
}
</style>
