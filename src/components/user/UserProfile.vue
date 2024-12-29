<template>
  <div class="user-profile" @click="viewUser(user.id)">
    <div class="user-info">
      <img v-if="user.pictureUrl" :src="user.pictureUrl" alt="User Picture" class="user-image" />
      <div class="user-details">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phoneNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type { UserProfile } from '@/interfaces/user/User'

const props = defineProps<{
  user: UserProfile
}>()

const router = useRouter()

const viewUser = (id: string) => {
  // Navigate to user details page
  router.push({ name: 'UserDetails', params: { id } })
}
</script>

<style scoped>
.user-profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.user-profile:hover {
  background-color: #e8f5e9;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
}

.user-details h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

.user-details p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
}
</style>
