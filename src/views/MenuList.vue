<template>
  <div class="menu-list">
    <h1>Menu</h1>
    <button @click="onCreate">Create New Item</button>

    <!-- Error Message -->
    <div v-if="menuStore.errorMessage" class="error-message">{{ menuStore.errorMessage }}</div>

    <!-- Loading State -->
    <div v-if="menuStore.loading" class="loading">Loading...</div>

    <!-- No Items Available -->
    <div v-if="menuStore.menuItems.length === 0" class="no-items">No items available.</div>

    <!-- Menu Items List -->
    <div class="menu-items-list">
      <MenuItem v-for="item in menuItems" :key="item.id" :menuItem="item" @delete="onDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from '@/components/menu/MenuItem.vue'

const menuStore = useMenuStore()
const router = useRouter()

// Define the list of menu items
const menuItems = ref(menuStore.menuItems)

// Load menu items from the store
const loadMenuItems = async () => {
  await menuStore.fetchMenuItems()
  menuItems.value = menuStore.menuItems // Update the menu items after fetch
}

// Handle item deletion
const onDelete = (id: string) => {
  menuStore.deleteMenuItem(id) // Call the delete method from the store
  menuItems.value = menuStore.menuItems // Update the list after deletion
}

const onCreate = () => {
  router.push({ name: 'CreateMenuItem' })
}

onMounted(loadMenuItems)
</script>

<style scoped>
.menu-list {
  margin: 0 auto;
  padding: 2rem;
  max-width: 900px;
}

.error-message {
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.loading {
  font-size: 1.2rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.no-items {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1rem;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.menu-items-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.menu-item:hover {
  background-color: #e8f5e9;
}

.menu-item-details {
  display: flex;
  gap: 1rem;
}

.menu-item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.menu-item-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
}

.available {
  color: green;
}

.not-available {
  color: red;
}

.menu-item-actions button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item-actions button:hover {
  background-color: #45a049;
}

.menu-item-actions button:active {
  transform: translateY(2px);
}
</style>
