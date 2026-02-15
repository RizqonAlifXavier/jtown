<script setup>
// Admin Layout - Isolated from Landing Page styles
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-logo">JTown Admin</div>
      <nav class="admin-nav">
        <router-link to="/admin" class="nav-item">Dashboard</router-link>
        <router-link to="/" class="nav-item back-link">Back to Site</router-link>
      </nav>
    </aside>
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
  color: #1e293b;
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.admin-sidebar {
  width: 260px;
  background-color: #1e293b;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.admin-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 3rem;
  color: #10b981;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  color: #cbd5e1;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-item:hover, .router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.back-link {
  margin-top: auto;
  font-size: 0.9rem;
  opacity: 0.8;
}

.admin-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
}
</style>
