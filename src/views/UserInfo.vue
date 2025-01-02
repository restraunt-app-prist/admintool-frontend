<template>
  <div class="user-info-container">
    <h1>User Information</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else>
      <div class="user-details">
        <h2>{{ user?.name }}</h2>
        <p>Email: {{ user?.email }}</p>
      </div>

      <div class="orders-section">
        <h3>Orders</h3>
        <div v-if="user?.orders?.length">
          <div v-for="order in user.orders" :key="order.id" class="order-item">
            <h4>Order ID: {{ order.id }}</h4>
            <p>Status: {{ order.status }}</p>
            <p>Total Price: ${{ order.totalPrice }}</p>
            <p>Stripe payment identifier: {{ order.paymentId }}</p>
            <ul>
              <li v-for="item in order.items" :key="item.id">
                {{ item.name }} - {{ item.quantity }}
              </li>
            </ul>
          </div>
        </div>
        <div v-else>No orders available.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const route = useRoute()

const userId = route.params.id as string

const fetchUserInfo = async () => {
  await userStore.fetchUserById(userId)
}

onMounted(fetchUserInfo)

const { user, loading, errorMessage } = storeToRefs(userStore)
</script>

<style scoped>
.user-info-container {
  padding: 20px;
}

.loading,
.error {
  color: red;
}

.user-details {
  margin-bottom: 20px;
}

.orders-section {
  margin-top: 20px;
}

.order-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
