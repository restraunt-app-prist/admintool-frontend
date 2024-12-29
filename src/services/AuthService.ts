import TokenService from './TokenService'
import ApiService from './BaseAPI'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginResponse } from '@/interfaces/auth/LoginResponse'

export default class AuthService {
  private router = useRouter()
  private authStore = useAuthStore()

  async login(username: string, password: string) {
    try {
      const response = await ApiService.post<LoginResponse>('/auth/login', { username, password })

      const token = response.data.token
      TokenService.setToken(token)

      this.authStore.login(token)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  logout() {
    TokenService.removeToken()

    this.authStore.logout()

    this.router.push('/login')
  }

  isAuthenticated(): boolean {
    return TokenService.isTokenValid()
  }

  protectRoute(to: any, from: any, next: any) {
    if (this.isAuthenticated()) {
      next()
    } else {
      next('/login')
    }
  }
}
