import type { UserProfile } from '@/interfaces/user/User'
import ApiService from './BaseAPI'
import type { UserWithOrdersResponse } from '@/interfaces/user/UserWithOrders'

const apiUrl = '/user'

class UserService {
  async getUsers(): Promise<UserProfile[]> {
    try {
      const response = await ApiService.get(apiUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching users', error)
      throw new Error('Failed to fetch users')
    }
  }

  async getUserById(userId: string): Promise<UserWithOrdersResponse> {
    const response = await ApiService.get(`${apiUrl}/${userId}`)
    return response.data
  }
}

export default new UserService()
