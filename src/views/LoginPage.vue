<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const authService = new AuthService()
    const token = await authService.login(username.value, password.value) // Get token after login
    router.push('/') // Redirect to home page after successful login
  } catch {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.auth-box {
  background-color: #fafafa; /* Lighter background for the form box */
  padding: 40px;
  border-radius: 10px; /* Slightly rounded borders */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Lighter shadow */
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333; /* Darker text color for headings */
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 1rem;
  color: #555; /* Slightly darker label color */
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ddd; /* Light border for input fields */
  border-radius: 8px; /* Slightly rounded borders */
  background-color: #f9f9f9; /* Light background for input */
  color: #333; /* Dark text color inside input */
  font-size: 1rem;
  transition:
    border-color 0.3s,
    background-color 0.3s;
}

input:focus {
  border-color: #4caf50;
  outline: none;
  background-color: #e8f5e9; /* Light green background on focus */
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50; /* Green button */
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 8px; /* Slightly rounded borders */
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s ease-in-out;
}

button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.error {
  margin-top: 10px;
  color: #f44336; /* Red color for error messages */
  font-size: 0.9rem;
}
</style>
