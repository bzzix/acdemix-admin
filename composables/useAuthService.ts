
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

interface LoginResponse {
  token: string
  user: any
  tenant: any
}

export function useAuthService() {
  const router = useRouter()

  // تسجيل الدخول
  const login = async (credentials: LoginCredentials): Promise<any> => {
    const { post } = useApi()
    try {
      const data = await post('admin/login', credentials)
      // خزّن التوكن في localStorage أو cookies إذا نجح
      if (data && data.token) {
        localStorage.setItem('token', data.token)
      }
      return data
    } catch (error: any) {
      // إذا كان هناك استجابة من السيرفر مع أخطاء
      if (error && error.data) {
        console.error('API Error:', error.data)
        return { error: true, ...error.data }
      }
      // خطأ عام
      console.error('API Error:', error)
      return { error: true, message: error?.message || 'Unknown error' }
    }
  }

  // تسجيل الخروج
  const logout = async () => {
    const { post } = useApi()
    const token = localStorage.getItem('token')
    await post('admin/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  return { login, logout }
}
