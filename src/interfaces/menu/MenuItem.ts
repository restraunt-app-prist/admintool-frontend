import type { MenuCategory } from './MenuCategory'

export interface MenuItem {
  id: string
  name: string
  description: string
  pictureUrl: string
  price: number
  category: MenuCategory
  available: boolean
  createdAt: string
  updatedAt: string
}
