<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import eventsData from '../data/events.json';

const router = useRouter();

// Function to check if event has ended
const isEventEnded = (endDate) => {
  if (!endDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventEnd = new Date(endDate);
  eventEnd.setHours(23, 59, 59, 999);
  return today > eventEnd;
};

// Load events from JSON file
const events = ref(eventsData);

// Track image loading state
const imageLoaded = ref({});

const onImageLoad = (eventId) => {
  imageLoaded.value[eventId] = true;
};

const onImageError = (eventId) => {
  console.warn(`Failed to load image for event ${eventId}`);
  imageLoaded.value[eventId] = true; // Still mark as "loaded" to hide skeleton
};

const viewEventDetail = (eventId) => {
  router.push(`/event/${eventId}`);
};
</script>

<template>
  <section id="events" class="events-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="text-gradient">Upcoming Events</h2>
        <p>Jangan lewatkan event-event menarik di JTown Mall</p>
      </div>
      
      <div class="events-grid">
        <div
          v-for="(event, index) in events"
          :key="event.id"
          class="event-card glass-card"
          :class="{ 'event-ended': isEventEnded(event.endDate) }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Status Badge for Ended Events -->
          <div v-if="isEventEnded(event.endDate)" class="event-badge event-ended-badge">
            Selesai
          </div>
          <!-- Regular Badge for Active Events -->
          <div v-else class="event-badge" :style="{ background: event.gradient }">
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
      </div>
    </div>
  </section>
</template>

<style scoped>
.events-section {
  padding: 100px 0;
  position: relative;
}

.events-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.event-card {
  flex: 0 1 400px;
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
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
  white-space: nowrap;
  max-width: 130px;
  text-align: center;
  line-height: 1.2;
}

/* Ended Event Styling */
.event-ended {
  opacity: 0.7;
  filter: grayscale(30%);
}

.event-ended:hover {
  opacity: 0.85;
  transform: translateY(-10px);
}

.event-ended-badge {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%) !important;
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
  flex-shrink: 0;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  margin-top: auto;
}

.btn-detail::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-detail:hover::before {
  left: 100%;
}

.btn-detail:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.btn-detail:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

/* Disabled state for ended events */
.event-ended .btn-detail {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: default;
}

.event-ended .btn-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
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

  .events-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .event-card {
    min-height: 280px;
  }

  .event-content h3 {
    font-size: 1.5rem;
  }

  .event-badge {
    font-size: 0.7rem;
    padding: 0.35rem 0.85rem;
    max-width: 110px;
    top: 1rem;
    right: 1rem;
    letter-spacing: 0.8px;
  }

  .event-content {
    padding: 2.75rem 1.75rem 2rem;
  }
}

@media (max-width: 480px) {
  .events-section {
    padding: 40px 0;
  }

  .event-content h3 {
    font-size: 1.25rem;
  }

  .event-subtitle {
    font-size: 0.9rem;
  }

  .event-date {
    font-size: 0.85rem;
  }

  .event-content {
    padding: 2.5rem 1.5rem 1.75rem;
  }

  .btn-detail {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style>
