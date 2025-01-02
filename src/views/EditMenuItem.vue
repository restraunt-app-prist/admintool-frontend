<template>
  <div class="form-container">
    <h2 class="form-title">Edit Menu Item</h2>
    <form @submit.prevent="updateMenuItem" class="form">
      <div class="form-group">
        <label>Name</label>
        <input v-model="menuItem.name" type="text" required class="input-field" />
      </div>

      <div class="form-group">
        <label>Description</label>
        <input v-model="menuItem.description" type="text" required class="input-field" />
      </div>

      <div class="form-group">
        <label>Price</label>
        <input v-model.number="menuItem.price" type="number" step="0.01" required class="input-field" />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select v-model="menuItem.category" required class="input-field">
          <option v-for="(category, key) in categoryMap" :key="key" :value="key">
            {{ category.icon }} {{ category.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Picture URL</label>
        <input v-model="menuItem.pictureUrl" type="text" required class="input-field" />
      </div>

      <!-- Available checkbox wrapped in a container for single row -->
      <div class="checkbox-container">
        <label for="available" class="checkbox-label">Available</label>
        <input v-model="menuItem.available" type="checkbox" class="checkbox-field" id="available" />
      </div>

      <button type="submit" class="submit-btn">Update</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { categoryMap } from './utils'
import { MenuCategory } from '@/interfaces/menu/MenuCategory'

const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()
const menuItem = ref({
  name: '',
  description: '',
  price: 0,
  category: MenuCategory.MEALS,
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

<style scoped>
.form-container {
  margin: 40px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
}

.input-field {
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.input-field:focus {
  border-color: #4caf50;
  background-color: #e8f5e9;
  outline: none;
}

/* Wrapper for the Available checkbox to ensure it's on a single row */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-label {
  font-size: 1rem;
  color: #666;
}

.checkbox-field {
  transform: scale(1.2);
}

.submit-btn {
  padding: 12px 24px;
  font-size: 1.1rem;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease-in-out;
  align-self: center;
}

.submit-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(1px);
}

.submit-btn:focus {
  outline: none;
}
</style>
