<script setup>
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import Events from '../components/Events.vue';
import Promotions from '../components/Promotions.vue';
import Stores from '../components/Stores.vue';
import Contact from '../components/Contact.vue';
</script>

<template>
  <div class="home">
    <Hero />
    <Promotions />
    <Events />
    <Features />
    <Stores />
    <Contact />
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}
</style>
