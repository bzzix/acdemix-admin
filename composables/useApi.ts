// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()

  const get = async (endpoint: string) => {
    return await $fetch(`${config.public.apiBaseUrl}/${endpoint}`)
  }

  const post = async (endpoint: string, data: any) => {
    return await $fetch(`${config.public.apiBaseUrl}/${endpoint}`, {
      method: 'POST',
      body: data,
    })
  }

  return { get, post }
}
