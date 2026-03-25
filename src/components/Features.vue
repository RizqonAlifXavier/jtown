<script setup>
import { ref } from 'vue';

const features = ref([
  {
    icon: `<img src="src/logo/paddle.png" class="icon-float" alt="">`,
    title: 'Sports & Recreation',
    description: 'Padeleon di rooftop - Fasilitas olahraga Padel modern pertama di Jakarta Timur. Rasakan sensasi berolahraga di ketinggian!',
    isHighlighted: true
  },
  {
    icon: `<img src="src/logo/charging-station.png" class="icon-pulse" alt="">`,
    title: 'Ultra Fast Charging Station',
    description: 'Pertama di Jakarta Timur! Stasiun pengisian daya kendaraan listrik Ultra Fast Charging dengan daya 240kW, tersedia untuk semua jenis mobil listrik demi kenyamanan pengunjung.',
    isHighlighted: true
  },
  {
    icon: `<img src="src/logo/food.png" alt="">`,
    title: 'Kuliner Beragam',
    description: 'Nikmati berbagai pilihan kuliner dari Yoshinoya, Solaria, Sate Malibu, Street Sushi, dan banyak lagi di setiap lantai'
  },
  {
    icon: `<img src="src/logo/coffe .png" alt="">`,
    title: 'Coffee & Beverages',
    description: 'Fore Coffee dan Coffee Agam siap menemani hari Anda dengan kopi berkualitas dan suasana nyaman'
  },
  {
    icon: `<img src="src/logo/workout.png" alt="">`,
    title: 'Fitness & Wellness',
    description: 'Anytime Fitness di lantai 2 untuk menjaga kesehatan dan kebugaran Anda kapan saja'
  },
  {
    icon: `<img src="src/logo/entertain.png" alt="">`,
    title: 'Entertainment',
    description: 'Outbreak dan berbagai hiburan menarik untuk mengisi waktu luang bersama keluarga'
  },
  {
    icon: `<img src="src/logo/social-media.png" alt="">`,
    title: 'Community Space',
    description: 'Gereja GBI dan ruang komunitas untuk kegiatan spiritual dan sosial'
  }
]);
</script>

<template>
  <section id="features" class="features-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="text-gradient">Why Choose JTown Mall?</h2>
        <p>Segala yang Anda butuhkan dalam satu tempat</p>
      </div>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card glass-card"
          :class="{ 'highlighted': feature.isHighlighted }"
        >
          <div v-if="feature.isHighlighted" class="exclusive-badge">EXCLUSIVE</div>
          <div class="feature-icon" v-html="feature.icon"></div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 100px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-card.highlighted {
  border: 2px solid #43e97b;
  background: rgba(67, 233, 123, 0.05);
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(67, 233, 123, 0.15);
  position: relative;
  overflow: hidden;
}

.feature-card.highlighted:hover {
  transform: scale(1.08) translateY(-5px);
  background: rgba(67, 233, 123, 0.08);
  box-shadow: 0 20px 50px rgba(67, 233, 123, 0.2);
}

.exclusive-badge {
  position: absolute;
  top: 15px;
  right: -35px;
  background: #43e97b;
  color: #000;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 5px 40px;
  transform: rotate(45deg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
}

.feature-icon {
  margin: 0 auto 1.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20px;
  color: var(--color-primary);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feature-icon :deep(img) {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card:hover .feature-icon :deep(img) {
  transform: scale(1.1);
}

/* Base Animations */
.icon-float {
  animation: float 3s ease-in-out infinite;
}

.icon-pulse {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.feature-card:hover .feature-icon :deep(svg) {
  transform: scale(1.1);
}

/* Path Animations */
.path-lightning {
  animation: lightning-flicker 1.5s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse-subtle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.9; }
}

@keyframes lightning-flicker {
  0%, 100% { opacity: 1; }
  10%, 30%, 50% { opacity: 0.8; stroke-width: 2; }
  20%, 40% { opacity: 1; stroke-width: 1.5; }
}

.highlighted .feature-icon {
  background: #43e97b;
  color: white;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  .feature-icon {
    font-size: 3rem;
  }

  .feature-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 1.75rem 1.25rem;
  }

  .feature-icon {
    font-size: 2.5rem;
  }

  .feature-title {
    font-size: 1.125rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}
</style>
