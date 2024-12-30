<template>
    <nav v-if="!hideNavbar" class="navbar">
      <ul class="nav-list">
        <li :class="{ active: isActive('/menu') }">
          <router-link to="/menu">Menu</router-link>
        </li>
        <li :class="{ active: isActive('/users') }">
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  
  const route = useRoute()
  
  // Check if a route is active
  const isActive = (path: string) => route.path === path
  
  // Reactive computed property to hide the navbar on certain routes
  const hideNavbar = computed(() => ['/login'].includes(route.path))
  </script>
  
  <style scoped>
  .navbar {
    background-color: #4caf50;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .nav-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-list li {
    margin-right: 1.5rem;
  }
  
  .nav-list li a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .nav-list li a:hover {
    background-color: #45a049;
  }
  
  .nav-list li.active a {
    background-color: #2e7d32;
  }
  </style>
  