import type { UserProfile } from '@/interfaces/user/User'
import UserService from '@/services/UserService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserProfile[]>([])
  const errorMessage = ref<string | null>(null)
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    try {
      users.value = await UserService.getUsers()
    } catch (error) {
      errorMessage.value = 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    errorMessage,
    loading,
    fetchUsers,
  }
})
