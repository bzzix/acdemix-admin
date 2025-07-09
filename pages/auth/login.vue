<template>
    <div class="container container-normal py-4">
        <Head>
            <Title>Login</Title>
        </Head>
        <div class="row align-items-center g-4">
        <div class="col-lg">
            <div class="container-tight">
            <div class="text-center mb-4">
                <NuxtLink to="/" class="navbar-brand navbar-brand-autodark">
                <template v-if="appLogo">
                    <img :src="appLogo" height="36" alt="" />
                </template>
                <template v-else>
                    <h1>{{ appName }}</h1>
                </template>
                </NuxtLink>
            </div>

            <div class="card card-md">
                <div class="card-body">
                <h2 class="h2 text-center mb-4">تسجيل الدخول إلى حسابك</h2>

                <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                    <label class="form-label">البريد الإلكتروني</label>
                    <input v-model="form.email" type="email" class="form-control" placeholder="your@email.com" required autofocus autocomplete="username">
                    </div>

                    <div class="mb-2">
                    <label class="form-label">
                        كلمة المرور
                        <span class="form-label-description">
                        <NuxtLink to="/auth/forgot-password">نسيت كلمة المرور؟</NuxtLink>
                        </span>
                    </label>
                    <div class="input-group input-group-flat">
                        <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="form-control" placeholder="كلمة المرور" required autocomplete="current-password">
                        <span class="input-group-text">
                        <a href="#" @click.prevent="togglePassword" class="link-secondary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path></svg>

                            <component :is="showPassword ? 'EyeOffIcon' : 'EyeIcon'" class="icon" />
                        </a>
                        </span>
                    </div>
                    </div>

                    <div class="mb-2">
                    <label class="form-check">
                        <input type="checkbox" v-model="form.remember" class="form-check-input">
                        <span class="form-check-label">تذكرني في هذا الجهاز</span>
                    </label>
                    </div>

                    <div class="form-footer">
                    <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        <span v-if="!loading">تسجيل الدخول</span>
                        <span v-else>جاري الدخول...</span>
                    </button>
                    </div>
                </form>
                </div>
            </div>

            <!-- <div class="text-center text-muted mt-3">
                لا تملك حساباً؟ <NuxtLink to="/auth/login" tabindex="-1">سجّل الآن</NuxtLink>
            </div> -->
            </div>
        </div>

        <div class="col-lg d-none d-lg-block">
            <img src="/assets/static/illustrations/undraw_secure_login_pdn4.svg" height="300" class="d-block mx-auto" alt="">
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/composables/useAuthService'
import 'izitoast/dist/css/iziToast.min.css'

const router = useRouter()
const form = ref({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const errors = ref([])
const loading = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const { login } = useAuthService()

const handleLogin = async () => {
  errors.value = []
  loading.value = true
  
  try {
    const result = await login(form.value)
    // إذا كان هناك خطأ من الـ API أظهره للمستخدم
    if (result && result.error) {
      let apiMsg = result.message || result.error_description || 'فشل تسجيل الدخول. تأكد من البيانات.'
      if (result.errors && typeof result.errors === 'object') {
        // Laravel validation errors
        apiMsg += '\n' + Object.values(result.errors).flat().join('\n')
      }
      throw new Error(apiMsg)
    }
    // حماية: إذا كانت النتيجة HTML أو string فيها <!DOCTYPE، اعتبرها خطأ
    if (
      !result ||
      (typeof result === 'string' && result.trim().startsWith('<!DOCTYPE'))
    ) {
      throw new Error('فشل الإتصال بالخادم')
    }
    if (process.client) {
      const iziToastImport = await import('izitoast')
      const izi = iziToast
      if (izi && typeof izi.success === 'function') {
        izi.success({
          title: 'نجاح',
          message: 'تم تسجيل الدخول بنجاح، سيتم تحويلك للوحة التحكم',
          position: 'topCenter',
          rtl: true,
          timeout: 1500
        })
      }
    }
    // توجيه مباشر بدون تأخير
    router.push('/')
  } catch (err) {
    let errorMsg = 'فشل تسجيل الدخول. تأكد من البيانات.'
    try {
      if (err) {
        if (typeof err === 'string') {
          errorMsg = err
        } else if (err.message) {
          errorMsg = err.message
        } else if (err.data && err.data.message) {
          errorMsg = err.data.message
        } else if (err.response && err.response._data && err.response._data.message) {
          errorMsg = err.response._data.message
        } else if (err.error && typeof err.error === 'string') {
          errorMsg = err.error
        } else if (err.statusMessage) {
          errorMsg = err.statusMessage
        } else if (err.toString) {
          errorMsg = err.toString()
        }
      }
    } catch (_) {
      errorMsg = 'فشل تسجيل الدخول. تأكد من البيانات.'
    }
    if (process.client) {
      try {
        const iziToastImport = await import('izitoast')
        const izi = iziToast
        if (izi && typeof izi.error === 'function') {
          izi.error({
            title: 'خطأ',
            message: errorMsg,
            position: 'topCenter',
            rtl: true
          })
        }
      } catch (_) {
        // تجاهل أي خطأ في iziToast
      }
    }
    errors.value = [errorMsg]
    console.error('login error', err)
  } finally {
    loading.value = false
  }
}


import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const appLogo = typeof config.public?.appLogo === 'string' ? config.public.appLogo : ''
const appName = config.public?.appName || 'App Name'

definePageMeta({
  layout: 'auth',
  middleware: [function redirectIfLoggedIn(to, from) {
    if (process.client) {
      const token = localStorage.getItem('token')
      if (token) {
        return navigateTo('/')
      }
    }
  }]
})
</script>
