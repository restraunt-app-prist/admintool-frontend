<template>
  <div>
    <h2>Edit Menu Item</h2>
    <form @submit.prevent="updateMenuItem">
      <label>Name</label>
      <input v-model="menuItem.name" type="text" required />

      <label>Description</label>
      <input v-model="menuItem.description" type="text" required />

      <label>Price</label>
      <input v-model.number="menuItem.price" type="number" required />

      <label>Category</label>
      <input v-model="menuItem.category" type="text" required />

      <label>Picture URL</label>
      <input v-model="menuItem.pictureUrl" type="text" required />

      <label>Available</label>
      <input v-model="menuItem.available" type="checkbox" />

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/interfaces/menu/MenuItem'
import { useMenuStore } from '@/stores/menu'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()
const menuItem = ref<MenuItem>({
  name: '',
  description: '',
  price: 0,
  category: '',
  pictureUrl: '',
  available: false,
  id: '',
  createdAt: '',
  updatedAt: '',
})

const loadMenuItem = async () => {
  const id = route.params.id as string
  const item = menuStore.menuItems.find((item) => item.id === id)
  if (item) {
    menuItem.value = { ...item }
  } else {
    alert('Menu item not found')
  }
}

const updateMenuItem = async () => {
  if (menuItem.value) {
    await menuStore.updateMenuItem(menuItem.value)
    router.push({ name: 'MenuList' })
  }
}

onMounted(loadMenuItem)
</script>
