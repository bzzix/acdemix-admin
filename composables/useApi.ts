// composables/useApi.ts
import { ofetch } from 'ofetch' // ✅ استخدام ofetch بدل $fetch لتجنب أخطاء stack
import { useRuntimeConfig } from '#imports' // في حال كنت تستخدم auto-import تأكد من وجودها

export const useApi = () => {
  const config = useRuntimeConfig()

  // دالة GET مع دعم للأنواع
  const get = async <T>(endpoint: string, options: any = {}): Promise<T> => {
    return await ofetch<T>(`${config.public.apiBaseUrl}/${endpoint}`, {
      method: 'GET',
      ...options
    })
  }

  // دالة POST مع دعم للأنواع
  const post = async <T>(endpoint: string, data: any, options: any = {}): Promise<T> => {
    return await ofetch<T>(`${config.public.apiBaseUrl}/${endpoint}`, {
      method: 'POST',
      body: data,
      ...options
    })
  }

  return { get, post }
}
