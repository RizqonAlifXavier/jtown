<script setup>
import { ref } from 'vue';

const features = ref([
  {
    icon: '🍜',
    title: 'Kuliner Beragam',
    description: 'Nikmati berbagai pilihan kuliner dari Yoshinoya, Solaria, Sate Malibu, Street Sushi, dan banyak lagi di setiap lantai'
  },
  {
    icon: '☕',
    title: 'Coffee & Beverages',
    description: 'Fore Coffee dan Coffee Agam siap menemani hari Anda dengan kopi berkualitas dan suasana nyaman'
  },
  {
    icon: '💪',
    title: 'Fitness & Wellness',
    description: 'Anytime Fitness di lantai 2 untuk menjaga kesehatan dan kebugaran Anda kapan saja'
  },
  {
    icon: '🎮',
    title: 'Entertainment',
    description: 'Outbreak dan berbagai hiburan menarik untuk mengisi waktu luang bersama keluarga'
  },
  {
    icon: '🏸',
    title: 'Sports & Recreation',
    description: 'Padeleon di rooftop - fasilitas olahraga modern yang segera hadir untuk Anda'
  },
  {
    icon: '⛪',
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
        >
          <div class="feature-icon">{{ feature.icon }}</div>
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

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
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
