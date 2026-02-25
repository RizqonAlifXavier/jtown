<script setup>
import { ref, onMounted } from 'vue';
import { newsService } from '../services/newsService';

const newsItems = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    newsItems.value = await newsService.getAll();
  } catch (error) {
    console.error('Failed to load news:', error);
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<template>
  <section id="news" class="news-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="text-gradient">Berita Seputar JTown</h2>
        <p>Ikuti perkembangan terbaru dan info menarik dari JTown Mall</p>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Memuat berita...</p>
      </div>

      <div v-else-if="newsItems.length === 0" class="empty-state">
        <p>Belum ada berita saat ini.</p>
      </div>

      <div v-else class="news-grid">
        <div 
          v-for="(item, index) in newsItems" 
          :key="item.id"
          class="news-card glass-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="news-image" v-if="item.image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="news-content">
            <span class="news-date">{{ formatDate(item.date) }}</span>
            <h3>{{ item.title }}</h3>
            <p v-html="item.content.length > 100 ? item.content.substring(0, 100) + '...' : item.content"></p>
            <router-link :to="`/news/${item.id}`" class="read-more">
              Baca Selengkapnya →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  padding: 80px 0;
  background: var(--dark-soft);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.news-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-image {
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: crop;
  transition: transform 0.5s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-date {
  font-size: 0.85rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.news-content h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: var(--color-text);
}

.news-content p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.read-more {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.read-more:hover {
  opacity: 0.8;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(16, 185, 129, 0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
