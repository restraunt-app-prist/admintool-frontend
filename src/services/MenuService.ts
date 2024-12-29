import type { MenuItem } from '@/interfaces/menu/MenuItem'
import ApiService from './BaseAPI'

const apiUrl = '/menu'

class MenuService {
  async getMenuItems(): Promise<MenuItem[]> {
    try {
      const response = await ApiService.get(apiUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching menu items', error)
      throw new Error('Failed to fetch menu items')
    }
  }

  async createMenuItem(
    menuItem: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<MenuItem> {
    try {
      const response = await ApiService.post(apiUrl, menuItem)
      return response.data
    } catch (error) {
      console.error('Error creating menu item', error)
      throw new Error('Failed to create menu item')
    }
  }

  async updateMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    try {
      const response = await ApiService.put(`${apiUrl}/${menuItem.id}`, menuItem)
      return response.data
    } catch (error) {
      console.error('Error updating menu item', error)
      throw new Error('Failed to update menu item')
    }
  }

  async deleteMenuItem(menuItemId: string): Promise<void> {
    try {
      await ApiService.delete(`${apiUrl}/${menuItemId}`)
    } catch (error) {
      console.error('Error deleting menu item', error)
      throw new Error('Failed to delete menu item')
    }
  }
}

export default new MenuService()
