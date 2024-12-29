<template>
    <div class="menu-item">
      <div class="menu-item-details">
        <img
          :src="imageSrc"
          alt="Menu Item"
          class="menu-item-img"
          @error="onImageError"
        />
        <div class="menu-item-info">
          <h3>{{ menuItem.name }}</h3>
          <p>{{ menuItem.description }}</p>
          <p class="price">Price: ₴{{ menuItem.price.toFixed(2) }}</p>
          <p :class="{ available: menuItem.available, 'not-available': !menuItem.available }">
            Status: {{ menuItem.available ? 'Available' : 'Not Available' }}
          </p>
        </div>
      </div>
      <div class="menu-item-actions">
        <button @click="onEdit(menuItem.id)">
          <span class="icon">✏️</span> Edit
        </button>
        <button @click="onDelete(menuItem.id)">
          <span class="icon">🗑️</span> Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { MenuItem } from '@/interfaces/menu/MenuItem'
  import { defineProps, defineEmits, ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Define the prop for the menu item
  const props = defineProps({
    menuItem: {
      type: Object as () => MenuItem,
      required: true,
    },
  })
  
  // Define the emit event for the parent to handle deletion
  const emit = defineEmits<{
    (e: 'delete', id: string): void
  }>()
  
  const router = useRouter()
  
  // Default image for menu items
  const defaultImage = '/default-meal.jpg' // This is the path to the default image
  
  const imageSrc = ref(props.menuItem.pictureUrl || defaultImage)
  
  const onImageError = () => {
    imageSrc.value = defaultImage // Set the default image if URL fails
  }
  
  // Function to navigate to the edit page
  const onEdit = (id: string) => {
    router.push({ name: 'EditMenuItem', params: { id } })
  }
  
  // Function to emit delete event to the parent
  const onDelete = (id: string) => {
    emit('delete', id) // Emit event to parent component
  }
  </script>
  
  <style scoped>
  .menu-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding: 1.2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }
  
  .menu-item-details {
    display: flex;
    align-items: center;
  }
  
  .menu-item-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right: 1.2rem;
    border-radius: 8px;
  }
  
  .menu-item-info {
    flex-grow: 1;
  }
  
  .menu-item-info h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .menu-item-info p {
    margin: 0.3rem 0;
    color: #666;
  }
  
  .price {
    font-weight: bold;
    color: #4caf50;
  }
  
  .available {
    color: green;
  }
  
  .not-available {
    color: red;
  }
  
  .menu-item-actions {
    display: flex;
    align-items: center;
  }
  
  .menu-item-actions button {
    padding: 10px 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
  }
  
  .menu-item-actions button .icon {
    margin-right: 8px;
  }
  
  .menu-item-actions button:hover {
    background-color: #0056b3;
  }
  
  .menu-item-actions button:active {
    transform: translateY(2px);
  }
  </style>
  