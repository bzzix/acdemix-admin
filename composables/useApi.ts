// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()


  // يدعم headers وخيارات إضافية
  const get = async (endpoint: string, options: any = {}) => {
    return await $fetch(`${config.public.apiBaseUrl}/${endpoint}`, {
      method: 'GET',
      ...options
    })
  }

  const post = async (endpoint: string, data: any, options: any = {}) => {
    return await $fetch(`${config.public.apiBaseUrl}/${endpoint}`, {
      method: 'POST',
      body: data,
      ...options
    })
  }

  return { get, post }
}
