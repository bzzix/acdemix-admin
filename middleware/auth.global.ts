export default defineNuxtRouteMiddleware(async (to, from) => {
  let token
  if (process.client) {
    token = localStorage.getItem('token')
  } else {
    token = useCookie('admin_token').value
  }

  const publicPages = ['/auth/login', '/auth/forgot-password', '/support', '/terms', '/policy']

  // إذا كان مسجل دخول ويحاول الذهاب لصفحة تسجيل الدخول، وجهه مباشرة
  if (token && to.path === '/auth/login') {
    if (to.query.redirect) {
      return navigateTo(to.query.redirect as string, { replace: true })
    }
    return navigateTo('/', { replace: true })
  }

  // فحص صلاحية التوكن عبر /me فقط للصفحات المحمية
  let isTokenValid = false
  if (token && !publicPages.includes(to.path)) {
    try {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      await $fetch(`${apiBaseUrl}/admin/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      isTokenValid = true
    } catch (error) {
      if (process.client) {
        localStorage.removeItem('token')
      }
      token = null
    }
  }

  // إذا لم يوجد توكن أو غير صالح
  if (!token || (!isTokenValid && !publicPages.includes(to.path))) {
    if (publicPages.includes(to.path)) return
    return navigateTo({ path: '/auth/login', query: { redirect: to.fullPath } }, { replace: true })
  }
})