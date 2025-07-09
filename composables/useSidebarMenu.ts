import { type Ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * مولد ديناميكي لقائمة السايدبار بناءً على صلاحيات المستخدم
 * @param user المستخدم الحالي (يجب أن يحتوي على مصفوفة permissions)
 */

export function useSidebarMenu(userRef: Ref<any>)
 {
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
    {
      key: 'paymentSettings',
      title: 'paymentSettings',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <rect x="3" y="5" width="18" height="14" rx="3" /> <line x1="3" y1="10" x2="21" y2="10" /> <line x1="7" y1="15" x2="7.01" y2="15" /> <line x1="11" y1="15" x2="13" y2="15" /> </svg>', // أيقونة مناسبة
      permission: 'payment_gateways_view',
      children: [
        {
          key: 'stripe',
          title: 'stripe',
          to: '/payments/stripe',
          icon: ' ',
          permission: 'payment_gateways_stripe_view'
        },
        {
          key: 'moyasar',
          title: 'moyasar',
          to: '/payments/moyasar',
          icon: ' ',
          permission: 'payment_gateways_moyasar_view'
        }
      ]
    },
    {
      key: 'settings',
      title: 'settings',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>`,
      permission: 'settings_view',
      children: [
        {
          key: 'general',
          title: 'generalSettings',
          to: '/settings',
          icon: ' ',
          permission: 'settings_view'
        },
        {
          key: 'profile',
          title: 'profile',
          to: '/settings/profile',
          icon: ` `,
          permission: 'settings_profile_view'
        },
        {
          key: 'security',
          title: 'security',
          to: '/settings/security',
          icon: ` `,
          permission: 'settings_security_view'
        },
        {
          key: 'maintenance',
          title: 'maintenanceMode',
          to: '/settings/maintenance',
          icon: ' ',
          permission: 'settings_maintenance_view'
        },
        {
          key: 'privacy',
          title: 'privacy',
          to: '/settings/privacy',
          icon: ' ',
          permission: 'settings_privacy_view'
        },
        {
          key: 'email',
          title: 'emailSettings',
          to: '/settings/email',
          icon: ' ',
          permission: 'settings_email_view'
        }
      ]
    },
    {
      key: 'support',
      title: 'support',
      to: '/support',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M4 13v-3a8 8 0 0 1 16 0v3" /> <path d="M18 19a4 4 0 0 0 -4 -4h-4a4 4 0 0 0 -4 4" /> <path d="M8 19v1a3 3 0 0 0 6 0v-1" /> </svg>'
      // لا تضع permission هنا
    },

  ]


  // فلترة العناصر: العامة تظهر دائماً، والباقي حسب الصلاحيات
const sidebarMenu = computed(() => {
  const user = userRef?.value
  const permissions = user?.permissions || []

  const hasPermission = (perm?: string) => {
    if (!perm) return true
    return permissions.includes(perm)
  }

  const filterMenu = (items: any[]) => {
    return items
      .map(item => {
        const newItem = { ...item }

        // فلترة العناصر الفرعية (إن وُجدت)
        if (newItem.children && Array.isArray(newItem.children)) {
          newItem.children = filterMenu(newItem.children)
        }

        // احتفظ بالعنصر إذا:
        // - ليس له صلاحية محددة
        // - أو لديه صلاحية
        // - أو لديه أطفال بعد الفلترة
        const isVisible = hasPermission(newItem.permission) || (newItem.children && newItem.children.length > 0)

        return isVisible ? newItem : null
      })
      .filter(Boolean)
  }

  return filterMenu(menuConfig)
})


  
  return { sidebarMenu }
}
