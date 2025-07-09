export default defineNuxtRouteMiddleware(async (to) => {
  console.log('[middleware] permissions check:', to.fullPath)

  const requiredPermission = to.meta.permission
  if (!requiredPermission) {
    return // ← السماح بمتابعة التنقل
  }

  const { currentUser, fetchCurrentUser } = useCurrentUser()

  if (!currentUser.value) {
    await fetchCurrentUser()
  }

  const permissions = currentUser.value?.permissions || []
  const hasAccess = permissions.includes(requiredPermission)

  if (!hasAccess) {
    console.warn('🚫 الصلاحية مفقودة:', requiredPermission)
    return navigateTo('/unauthorized')
  }

  return // ← مهم جدًا للسماح بالتنقل إذا كل شيء OK
})
