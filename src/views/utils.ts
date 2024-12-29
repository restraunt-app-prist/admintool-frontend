import { MenuCategory } from '@/interfaces/menu/MenuCategory'

export const categoryMap: { [key in MenuCategory]: { label: string; icon: string } } = {
  [MenuCategory.MEALS]: { label: 'Meals', icon: '🍽️' },
  [MenuCategory.SNACKS]: { label: 'Snacks', icon: '🍪' },
  [MenuCategory.DESSERTS]: { label: 'Desserts', icon: '🍰' },
  [MenuCategory.DRINKS]: { label: 'Drinks', icon: '🥤' },
}
