import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

const currentUser = ref<any>(null)
const loadingUser = ref(false)
const errorUser = ref<string | null>(null)

export function useCurrentUser() {
  interface UserResponse {
    user?: any
    [key: string]: any
  }

  const fetchCurrentUser = async () => {
    loadingUser.value = true
    errorUser.value = null
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        currentUser.value = null
        loadingUser.value = false
        return
      }
      const { get } = useApi()
      const data = await get<UserResponse>('admin/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      currentUser.value = data?.user || data
      console.log(data)
    } catch (e: any) {
      currentUser.value = null
      errorUser.value = e?.message || 'Unknown error'
    } finally {
      loadingUser.value = false
    }
  }

  // ⚠️ أزلنا onMounted() — اجعل المكون هو من يستدعي fetchCurrentUser()

  return { currentUser, loadingUser, errorUser, fetchCurrentUser }
}
