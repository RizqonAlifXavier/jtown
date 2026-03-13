<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { eventService } from '../services/eventService';

const router = useRouter();

// Load events from service
const events = ref([]);

onMounted(async () => {
  events.value = await eventService.getAll();
});

// Filter events into upcoming and past
const upcomingEvents = computed(() => {
  return events.value.filter(event => !eventService.isEventEnded(event.endDate));
});


const viewEventDetail = (eventId) => {
  router.push(`/event/${eventId}`);
};
</script>

<template>
  <section id="events" class="events-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="text-gradient">Events</h2>
        <p>Jelajahi event-event menarik di JTown Mall</p>
      </div>

      
      <!-- Upcoming Events Grid -->
      <div class="events-grid" data-animate="fade-up">
        <div
          v-for="(event, index) in upcomingEvents"
          :key="event.id"
          class="event-card glass-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="event-badge" :style="{ background: event.gradient }">
            {{ event.badge }}
          </div>
          
          <div class="event-content">
            <h3>{{ event.title }}</h3>
            <p class="event-subtitle">{{ event.subtitle }}</p>
            <div class="event-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ event.date }}
            </div>
            <button @click="viewEventDetail(event.id)" class="btn-detail">
              Lihat Detail →
            </button>
          </div>
        </div>
        <div v-if="upcomingEvents.length === 0" class="no-events">
          <p>Belum ada event mendatang saat ini.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events-section {
  padding: 100px 0;
  position: relative;
}

.events-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  padding: 0.75rem 2rem;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-weight: 600;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.events-grid, .past-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.past-grid {
  grid-template-columns: 1fr;
}

.event-card, .past-event-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.event-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.event-content {
  padding: 3rem 2rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.event-content h3 {
  color: var(--color-text);
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.event-subtitle {
  color: var(--color-text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.event-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.event-date svg {
  color: var(--color-primary);
}

.btn-detail {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

/* Past Documentation Styles */
.past-event-card {
  padding: 2rem;
}

.past-event-header {
  margin-bottom: 1.5rem;
}

.past-event-header h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.past-event-date {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.documentation-gallery {
  width: 100%;
  overflow: hidden;
}

.gallery-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) transparent;
}

.gallery-scroll::-webkit-scrollbar {
  height: 6px;
}

.gallery-scroll::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 10px;
}

.gallery-item {
  flex: 0 0 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gallery-item img, .gallery-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.video-item {
  background: #000;
}

.no-events, .no-documentation {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
}

/* Tablet */
@media (max-width: 1024px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .events-section {
    padding: 60px 0;
  }

  .events-tabs {
    width: 90%;
    flex-direction: row;
    font-size: 0.9rem;
  }

  .tab-btn {
    padding: 0.6rem 1rem;
    flex: 1;
    font-size: 0.8rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .gallery-item {
    flex: 0 0 250px;
    height: 160px;
  }
}
</style>
