import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuItem } from '@/interfaces/menu/MenuItem'
import MenuService from '@/services/MenuService'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([])
  const errorMessage = ref<string | null>(null)
  const loading = ref(false)

  const fetchMenuItems = async () => {
    loading.value = true
    try {
      menuItems.value = await MenuService.getMenuItems()
    } catch (error) {
      errorMessage.value = 'Failed to load menu items'
    } finally {
      loading.value = false
    }
  }

  const createMenuItem = async (menuItem: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newItem = await MenuService.createMenuItem(menuItem)
      menuItems.value.push(newItem) // Add new item to the list
    } catch (error) {
      errorMessage.value = 'Failed to create menu item'
    }
  }

  const updateMenuItem = async (menuItem: MenuItem) => {
    try {
      const updatedItem = await MenuService.updateMenuItem(menuItem)
      const index = menuItems.value.findIndex((item) => item.id === menuItem.id)
      if (index !== -1) {
        menuItems.value[index] = updatedItem // Update the item in the list
      }
    } catch (error) {
      errorMessage.value = 'Failed to update menu item'
    }
  }

  const deleteMenuItem = async (id: string) => {
    try {
      await MenuService.deleteMenuItem(id)
      menuItems.value = menuItems.value.filter((item) => item.id !== id) // Remove the item from the list
    } catch (error) {
      errorMessage.value = 'Failed to delete menu item'
    }
  }

  return {
    menuItems,
    errorMessage,
    loading,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  }
})
