import type { UserProfile } from '@/interfaces/user/User'
import ApiService from './BaseAPI'

const apiUrl = '/users'

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
}

export default new UserService()
