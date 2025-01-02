<template>
  <div class="user-profile" @click="viewUser(user.id)">
    <div class="user-info">
      <img v-if="user.pictureUrl" :src="user.pictureUrl" alt="User Picture" class="user-image" />
      <div class="user-details">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p>Email: <span>{{ user.email }}</span></p>
        <p>Phone: <span>{{ user.phoneNumber }}</span></p>
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
  router.push({ name: 'UserInfo', params: { id } })
}
</script>

<style scoped>
/* Parent container */
.user-profile {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.user-profile:hover {
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Child container */
.user-info {
  display: flex;
  align-items: start;
  gap: 1.2rem;
  flex: 1; /* Ensures the content takes available space */
}

/* User image */
.user-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #cfd8dc;
  background-color: #f0f0f0;
}

/* User details */
.user-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}

/* Name */
.user-details h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #424242;
}

/* Info text */
.user-details p {
  margin: 0.3rem 0;
  font-size: 1rem;
  color: #757575;
}

.user-details p span {
  font-weight: 500;
  color: #616161;
}
</style>
