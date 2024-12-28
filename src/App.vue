<!-- src/App.vue -->
<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
@import './assets/base.css';

/* The main app container should fill the screen */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 2rem;
  background-color: var(--color-background);
}

/* Adjust layout for larger screens */
@media (min-width: 1024px) {
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>