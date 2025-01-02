import type { UserProfile } from '@/interfaces/user/User'
import type { UserWithOrdersResponse } from '@/interfaces/user/UserWithOrders'
import UserService from '@/services/UserService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserProfile[]>([])
  const user = ref<UserWithOrdersResponse | null>(null)
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

  const fetchUserById = async (userId: string) => {
    loading.value = true
    try {
      user.value = await UserService.getUserById(userId)
    } catch (error) {
      errorMessage.value = 'Failed to load user data'
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    user,
    errorMessage,
    loading,
    fetchUsers,
    fetchUserById,
  }
})
