<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section id="home" class="hero-section">
    <div class="container">
      <div class="hero-content" :class="{ 'fade-in-up': isVisible }">
        <h1 class="hero-title">
          JTown<br />Food and Entertainment Center
        </h1>
        <p class="hero-subtitle">
          Nikmati pengalaman hangout yang tak terlupakan dengan menikmati berbagai
          kuliner lezat dan hiburan dalam satu tempat.
        </p>
        <div class="hero-buttons">
          <a href="#stores" class="btn btn-primary">Explore Stores</a>
          <a href="#contact" class="btn btn-secondary">Visit Us</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  position: relative;
}

/* Hero Content */
.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  opacity: 0;
  position: relative;
  z-index: 1;
}

.hero-content.fade-in-up {
  animation: fadeInUp 1s ease forwards;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 900;
  color: #10b981 !important;
  -webkit-text-fill-color: #10b981 !important;
  background: none !important;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
    letter-spacing: 1px;
  }
}
</style>
