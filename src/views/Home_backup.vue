<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="app">
    <!-- Animated Background -->
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="gradient-orb orb-4"></div>
      <div class="gradient-orb orb-5"></div>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <div class="logo">
            <h2 class="text-gradient">JTown Mall</h2>
          </div>
          <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#events">Events</a>
            <a href="#features">Features</a>
            <a href="#stores">Stores</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
/* ===================================
   Animated Background
   =================================== */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation-duration: 20s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--gradient-1), transparent);
  top: 10%;
  left: 10%;
  animation-name: float-1;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--gradient-3), transparent);
  top: 50%;
  right: 10%;
  animation-name: float-2;
  animation-duration: 25s;
}

.orb-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, var(--gradient-4), transparent);
  bottom: 10%;
  left: 20%;
  animation-name: float-3;
  animation-duration: 22s;
}

.orb-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--gradient-5), transparent);
  top: 30%;
  left: 50%;
  animation-name: float-4;
  animation-duration: 18s;
}

.orb-5 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, var(--gradient-2), transparent);
  bottom: 20%;
  right: 30%;
  animation-name: float-5;
  animation-duration: 23s;
}

/* ===================================
   Navigation
   =================================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(var(--blur-md));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--color-light);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--gradient-1), var(--gradient-2));
  transition: width var(--transition-base);
}

.nav-links a:hover::after {
  width: 100%;
}

/* ===================================
   Responsive Design
   =================================== */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .gradient-orb {
    filter: blur(60px);
  }

  .orb-1,
  .orb-2,
  .orb-3,
  .orb-4,
  .orb-5 {
    width: 300px;
    height: 300px;
  }
}
</style>
