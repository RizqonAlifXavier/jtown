<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { newsService } from '../services/newsService';

const route = useRoute();
const router = useRouter();

const newsItem = ref(null);
const isLoading = ref(true);

const loadNews = async () => {
  isLoading.value = true;
  const id = route.params.id;
  try {
    newsItem.value = await newsService.getById(id);
  } catch (error) {
    console.error('Error loading news:', error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push('/');
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

onMounted(() => {
  loadNews();
  window.scrollTo(0, 0);
});

watch(() => route.params.id, loadNews);
</script>

<template>
  <div class="news-detail-page">
    <div v-if="isLoading" class="container loading-container">
      <div class="loader"></div>
      <p>Memuat berita...</p>
    </div>

    <div v-else-if="newsItem" class="news-detail">
      <!-- Hero Section -->
      <div class="news-hero" :style="newsItem.image ? { backgroundImage: `url(${newsItem.image})` } : {}">
        <div class="hero-overlay"></div>
        <div class="container">
          <button @click="goBack" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Kembali
          </button>
          <div class="hero-content">
            <span class="news-date-badge">{{ formatDate(newsItem.date) }}</span>
            <h1 class="news-title">{{ newsItem.title }}</h1>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="news-body">
        <div class="container">
          <div class="content-card glass-card">
            <div class="news-text" v-html="newsItem.content"></div>
            
            <div class="news-footer">
              <button @click="goBack" class="btn-primary">Lihat Berita Lainnya</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News not found -->
    <div v-else class="not-found">
      <div class="container">
        <h1>Berita Tidak Ditemukan</h1>
        <p>Maaf, berita yang Anda cari tidak tersedia.</p>
        <button @click="goBack" class="btn-primary">Kembali ke Beranda</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: var(--dark);
  color: white;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(16, 185, 129, 0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Hero Section */
.news-hero {
  position: relative;
  min-height: 60vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center; /* Center vertically in hero */
  justify-content: center;
  padding: 120px 0 60px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.3) 0%, 
    rgba(0, 0, 0, 0.7) 100%
  );
}

.back-button {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%); /* Center the back button at top */
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: white;
  color: #1e293b;
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
}

.news-date-badge {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  backdrop-filter: blur(5px);
}

.news-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* Body Section */
.news-body {
  padding: 0 0 5rem;
  margin-top: -80px; /* Stronger overlap for better flow */
  position: relative;
  z-index: 5;
}

.content-card {
  background: white;
  padding: 4rem;
  border-radius: 32px;
  color: #1e293b;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.news-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #334155;
}

.news-footer {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid #f1f5f9;
  text-align: center;
}

.btn-primary {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

@media (max-width: 768px) {
  .news-hero {
    min-height: 50vh;
  }

  .news-title {
    font-size: 2.25rem;
  }
  
  .content-card {
    padding: 2.5rem 1.75rem;
    border-radius: 24px;
  }
  
  .news-text {
    font-size: 1.1rem;
  }

  .back-button {
    top: 30px;
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }

  .news-body {
    margin-top: -50px;
  }
}
</style>
