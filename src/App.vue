<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>
