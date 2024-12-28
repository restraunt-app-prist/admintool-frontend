<!-- src/components/Layout.vue -->
<template>
    <div class="layout-container">
      <div class="content-container">
        <slot></slot> <!-- This will render the content passed to this component -->
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Layout',
  };
  </script>
  
  <style scoped>
  .layout-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content-container {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  