<script setup>
import { ref } from "vue";

// Create a seamless repeating pattern of promos for 1 row
// Pattern: Promo 1, Promo 2
const promoImages = ref([
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
  "/promo/promo1.jpeg", "/promo/promo2.jpeg",
]);
</script>

<template>
  <section class="promotions" id="promotions">
    <div class="container">
      <div class="section-header text-center" data-animate="fade-up">
        <h2 class="section-title">Hot Promotions</h2>
        <p class="section-subtitle">Don't miss out on these amazing deals</p>
      </div>

      <div class="slider-container">
        <div class="promotions-slider">
          <div
            v-for="(image, index) in promoImages"
            :key="index"
            class="promo-image-wrapper"
          >
            <img :src="image" :alt="'Promo ' + (index + 1)" class="promo-image" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.promotions {
  background: linear-gradient(180deg, var(--dark-light) 0%, var(--dark) 100%);
  padding: 80px 0;
  overflow: hidden; /* Prevent horizontal scrollbar on body */
}

.slider-container {
  width: 100%;
  max-width: 1120px; /* Fits exactly 4 columns of 250px + 30px gap */
  margin: 0 auto;
  overflow: hidden; /* Hide overflow for desktop auto-slide */
  position: relative;
  padding: 20px 0;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.promotions-slider {
  display: flex;
  flex-direction: row;
  gap: 30px;
  /* Auto sliding animation for desktop */
  /* Slide pattern is 2 columns wide = 2 * (250 + 30) = 560px */
  animation: scroll-desktop 10s linear infinite;
  width: max-content;
}

.promotions-slider:hover {
  animation-play-state: paused;
}

.promo-image-wrapper {
  width: 250px;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  border: 2px solid rgba(255, 255, 255, 0.05);
  background: transparent;
  flex-shrink: 0; /* Prevent squishing in flex container */
  display: flex;
}

.promo-image-wrapper:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border-color: rgba(16, 185, 129, 0.5);
  z-index: 10;
}

.promo-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  transition: transform 0.5s ease;
}

@keyframes scroll-desktop {
  0% { transform: translateX(0); }
  100% { transform: translateX(-560px); }
}

@media (max-width: 1024px) {
  .slider-container {
    max-width: 840px; /* Fits 3 columns */
  }
}

@media (max-width: 768px) {
  .slider-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* Firefox */
    mask-image: none;
    -webkit-mask-image: none;
    padding: 20px 15px;
    max-width: 100%;
  }
  .slider-container::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
  
  .promotions-slider {
    gap: 15px;
    animation: none; /* Disable auto-slide on mobile */
    padding: 0;
  }
  
  .promo-image-wrapper {
    width: 220px; /* Slightly smaller on mobile to fit nicely */
    height: auto;
    scroll-snap-align: center;
  }
}
</style>
