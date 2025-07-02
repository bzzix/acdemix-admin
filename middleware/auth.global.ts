export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('admin_token')
  
  if (!token.value && to.path !== '/auth/login' && to.path !== '/auth/register' && to.path !== '/auth/forgot-password' && to.path !== '/support' && to.path !== '/terms' && to.path !== '/policy') {
    return navigateTo('/auth/login')
  }

})