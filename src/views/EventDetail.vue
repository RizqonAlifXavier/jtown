<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { eventService } from '../services/eventService';

const route = useRoute();
const router = useRouter();

const event = ref(null);

const loadEvent = async () => {
  const id = parseInt(route.params.id);
  event.value = await eventService.getById(id);
};

onMounted(loadEvent);
watch(() => route.params.id, loadEvent);

const goBack = () => {
  router.push('/');
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="event-detail" v-if="event">
    <!-- Hero Section -->
    <div class="event-hero" :style="{ backgroundImage: `url(${event.image})` }">
      <div class="hero-overlay"></div>
      <div class="container">
        <button @click="goBack" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </button>
        <div class="hero-content" data-animate="fade-up">
          <div class="event-badge" :style="{ background: event.gradient }">
            {{ event.badge }}
          </div>
          <h1 class="event-title">{{ event.title }}</h1>
          <p class="event-discount">{{ event.subtitle }}</p>
          <div class="event-meta">
            <span class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ event.date }}
            </span>
            <span class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {{ event.location }}
            </span>
            <span class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              {{ event.category }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="event-content">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <section class="content-section" data-animate="fade-up">
              <h2>About This Event</h2>
              <p class="description">{{ event.fullDescription }}</p>
            </section>

            <section class="content-section" data-animate="fade-up" data-delay="100">
              <h2>Terms & Conditions</h2>
              <ul class="terms-list">
                <li v-for="(term, index) in event.terms" :key="index">
                  {{ term }}
                </li>
              </ul>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="info-card" data-animate="fade-left">
              <h3>Event Details</h3>
              <div class="info-item">
                <span class="info-label">Duration</span>
                <span class="info-value">{{ event.date }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Location</span>
                <span class="info-value">{{ event.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Category</span>
                <span class="info-value">{{ event.category }}</span>
              </div>
            </div>

            <div class="share-card" data-animate="fade-left" data-delay="100">
              <h3>Share This Event</h3>
              <div class="share-buttons">
                <button class="share-btn facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button class="share-btn twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="share-btn whatsapp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Event not found -->
  <div v-else class="not-found">
    <div class="container">
      <h1>Event Not Found</h1>
      <p>Sorry, the event you're looking for doesn't exist.</p>
      <button @click="goBack" class="btn-primary">Back to Home</button>
    </div>
  </div>
</template>

<style scoped>
.event-detail {
  min-height: 100vh;
  background: var(--dark);
}

/* Hero Section */
.event-hero {
  position: relative;
  min-height: 65vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 80px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
}

.back-button {
  position: absolute;
  top: 100px;
  left: 2rem;
  padding: 0.875rem 1.75rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.back-button:hover {
  background: white;
  transform: translateX(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
  width: 100%;
}

.event-badge {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.event-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.event-discount {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2.5rem;
  font-weight: 500;
  line-height: 1.6;
}

.event-meta {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.meta-item svg {
  flex-shrink: 0;
}
.event-content {
  padding: 80px 0;
  background: transparent;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 50px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.content-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
}

.description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.terms-list {
  list-style: none;
  padding: 0;
}

.terms-list li {
  padding: 15px 0;
  padding-left: 30px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
}

.terms-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #43e97b;
  font-weight: bold;
  font-size: 1.2rem;
}

/* Main Content Section */
.content-section h2 {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-card,
.share-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.info-card h3,
.share-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 25px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.info-item:last-of-type {
  border-bottom: none;
}

.info-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  color: var(--color-text);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.6;
}



.share-buttons {
  display: flex;
  gap: 15px;
}

.share-btn {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-btn:hover {
  transform: translateY(-3px);
}

.share-btn.facebook {
  background: #1877f2;
  color: white;
}

.share-btn.twitter {
  background: #1da1f2;
  color: white;
}

.share-btn.whatsapp {
  background: #25d366;
  color: white;
}

/* Not Found */
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 1.2rem;
  color: var(--light-gray);
  margin-bottom: 30px;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .event-hero {
    min-height: 55vh;
    padding-top: 70px;
  }

  .back-button {
    top: 80px;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }

  .hero-content {
    padding: 2rem 1.5rem;
  }

  .event-badge {
    padding: 0.6rem 1.5rem;
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .event-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .event-discount {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }

  .event-meta {
    gap: 1rem;
    margin-top: 1.5rem;
    flex-direction: column; /* Keep existing property */
  }

  .meta-item {
    font-size: 0.875rem;
    padding: 0.75rem 1.25rem;
    gap: 0.5rem;
  }

  .event-content {
    padding: 60px 0;
  }

  .content-section {
    padding: 2rem 1.5rem;
  }

  .content-section h2 { /* Keep existing property */
    font-size: 1.5rem;
  }

  .sidebar {
    padding: 2rem 1.5rem;
  }
}
</style>
