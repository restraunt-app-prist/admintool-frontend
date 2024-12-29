<template>
  <div>
    <h1>User Profiles</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <div v-if="!loading && users.length > 0">
      <UserProfile v-for="user in users" :key="user.id" :user="user" />
    </div>

    <div v-if="users.length === 0 && !loading">No users found.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import UserProfileComponent from '@/components/user/UserProfile.vue'
import { useUserStore } from '../stores/user'
import UserProfile from '../components/user/UserProfile.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

const users = userStore.users
const loading = userStore.loading
const errorMessage = userStore.errorMessage
</script>

<style scoped>
.loading {
  font-size: 1.2rem;
  color: #007bff;
}

.error {
  color: red;
  font-size: 1.2rem;
}
</style>
