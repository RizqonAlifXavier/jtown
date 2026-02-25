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
  background: #f1f5f9; /* Light gray background for contrast with white card */
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 3.5rem 3rem;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.login-header {
  text-align: center;
  margin-bottom: 3rem;
}

.login-header h1 {
  font-size: 2.75rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-header p {
  color: #64748b;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #1e293b; /* Dark text for label */
}

.form-group input {
  padding: 1rem 1.25rem;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  color: #1e293b; /* Dark text for input */
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input::placeholder {
  color: #94a3b8;
}

.form-group input:focus {
  outline: none;
  border-color: #10b981;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

.btn-login {
  margin-top: 1rem;
  padding: 1.125rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.3);
  filter: brightness(1.05);
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
