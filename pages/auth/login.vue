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
                    <h1>{{ appName || tenantName }}</h1>
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
                    <button type="submit" class="btn btn-primary w-100">تسجيل الدخول</button>
                    </div>
                </form>
                </div>
            </div>

            <!-- <div class="text-center text-muted mt-3">
                لا تملك حساباً؟ <NuxtLink to="/auth/register" tabindex="-1">سجّل الآن</NuxtLink>
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

const router = useRouter()
const form = ref({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const errors = ref([])

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  errors.value = []
  try {
    // استبدل هذا بطلب تسجيل الدخول الفعلي
    await fakeLogin(form.value)
    router.push('/dashboard')
  } catch (e) {
    errors.value = ['فشل تسجيل الدخول. تأكد من البيانات.']
  }
}

const appLogo = 'settings("appLogo")' // عيّنه حسب حالتك
const appName = 'App Name' // أو اجلبه من إعدادات
const tenantName = 'Tenant Name'

// مثال وهمي لتسجيل الدخول
const fakeLogin = async (credentials) => {
  if (!credentials.email || !credentials.password) throw new Error('Invalid')
  return true
}
</script>
