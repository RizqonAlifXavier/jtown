<script setup>
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import Events from '../components/Events.vue';
import News from '../components/News.vue';
import Stores from '../components/Stores.vue';
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="home">
    <Hero />
    <Events />
    <News />
    <Features />
    <Stores />
    <Contact />
    <Footer />
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}
</style>
