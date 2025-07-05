import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * مولد ديناميكي لقائمة السايدبار بناءً على صلاحيات المستخدم
 * @param user المستخدم الحالي (يجب أن يحتوي على مصفوفة permissions)
 */
export function useSidebarMenu(user: any) {
  const { t } = useI18n()

  // مثال: الصلاحيات المتاحة لكل عنصر
  const menuConfig = [
    {
      key: 'dashboard',
      title: 'dashboard',
      to: '/',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>`,
      permission: 'dashboard_view',
    },
    {
      key: 'users',
      title: 'users',
      to: '/users',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M17 11v-1a4 4 0 1 0 -8 0v1" /><path d="M3 21v-2a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v2" /></svg>`,
      permission: 'users_view',
    },
    {
      key: 'tenants',
      title: 'tenants',
      to: '/tenants',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 11h18" /></svg>`,
      permission: 'tenants_view',
    },
    // ... أضف عناصر أخرى حسب الحاجة ...
  ]

  // فلترة العناصر حسب صلاحيات المستخدم
  const sidebarMenu = computed(() => {
    if (!user || !Array.isArray(user.permissions)) return []
    return menuConfig.filter(item => !item.permission || user.permissions.includes(item.permission))
  })

  return { sidebarMenu }
}
