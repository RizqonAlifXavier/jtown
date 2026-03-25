<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="main-layout">
    <!-- Animated Light Background -->
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="gradient-orb orb-4"></div>
      <div class="gradient-orb orb-5"></div>
    </div>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background-color: #f8fafc;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation-duration: 20s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--gradient-1), transparent 70%);
  top: 10%;
  left: 10%;
  animation-name: float-1;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--gradient-3), transparent 70%);
  top: 50%;
  right: 10%;
  animation-name: float-2;
  animation-duration: 25s;
}

.orb-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, var(--gradient-4), transparent 70%);
  bottom: 10%;
  left: 20%;
  animation-name: float-3;
  animation-duration: 22s;
}

.orb-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--gradient-5), transparent 70%);
  top: 30%;
  left: 50%;
  animation-name: float-4;
  animation-duration: 18s;
}

.orb-5 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, var(--gradient-2), transparent 70%);
  bottom: 20%;
  right: 30%;
  animation-name: float-5;
  animation-duration: 23s;
}

@media (max-width: 768px) {
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
