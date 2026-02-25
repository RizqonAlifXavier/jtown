<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  errorMsg.value = '';
  isLoading.value = true;
  
  // Debug check for credentials (only logs if they are missing)
  if (!import.meta.env.VITE_SUPABASE_URL) {
    console.error('VITE_SUPABASE_URL is missing in environment!');
  }

  try {
    const data = await authService.login(email.value, password.value);
    console.log('Login success:', data);
    router.push('/admin');
  } catch (error) {
    console.error('Login error details:', error);
    errorMsg.value = error.message || 'Login failed. Please check your credentials.';
    
    // Add specific hint for common Vercel/Supabase issues
    if (error.message?.includes('fetch')) {
      errorMsg.value += ' (Possible connection/environment issue)';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card glass-card">
      <div class="login-header">
        <h1 class="text-gradient">Admin Login</h1>
        <p>Enter your credentials to manage JTown Mall events</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMsg" class="error-alert">
          {{ errorMsg }}
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            required 
            placeholder="admin@jtown.com"
            :disabled="isLoading"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            required 
            placeholder="••••••••"
            :disabled="isLoading"
          >
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login →</span>
        </button>
      </form>
      
      <div class="login-footer">
        <router-link to="/" class="back-link">← Back to Website</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dark);
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  border-radius: 24px;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
}

.form-group input {
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

.btn-login {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.error-alert {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  color: #f87171;
  font-size: 0.9rem;
  text-align: center;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.back-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--color-primary);
}
</style>
