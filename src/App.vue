<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div id="app">
    <!-- Full Page Animated Background -->
    <!-- Solid White Background -->
    <div class="page-background"></div>

    <Navbar />
    <router-view />
  </div>
</template>

<style>
/* Full Page Animated Background */
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #ffffff;
}
</style>

