import { defineStore } from 'pinia'
import TokenService from '@/services/TokenService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: TokenService.isTokenValid(),
  }),
  actions: {
    login(token: string) {
      TokenService.setToken(token)
      this.isAuthenticated = true
    },
    logout() {
      TokenService.removeToken()
      this.isAuthenticated = false
    },
  },
})
