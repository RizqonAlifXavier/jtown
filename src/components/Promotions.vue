<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const promotions = ref([
  {
    id: 1,
    badge: "NEW",
    badgeClass: "new",
    title: "Grand Opening Sale",
    discount: "Up to 70% OFF",
    description: "Celebrate with us! Massive discounts on all categories.",
    date: "Valid until Feb 28, 2026",
    delay: "0",
  },
  {
    id: 2,
    badge: "HOT",
    badgeClass: "hot",
    title: "Weekend Special",
    discount: "Buy 2 Get 1 Free",
    description: "Every Saturday & Sunday on selected items.",
    date: "Every Weekend",
    delay: "100",
  },
  {
    id: 3,
    badge: "EXCLUSIVE",
    badgeClass: "exclusive",
    title: "Member Rewards",
    discount: "Extra 20% OFF",
    description: "Join our loyalty program for exclusive benefits.",
    date: "Year-round",
    delay: "200",
  },
]);

const navigateToEvent = (id) => {
  console.log('Navigating to event:', id);
  router.push(`/event/${id}`);
};
</script>

<template>
  <section class="promotions" id="promotions">
    <div class="container">
      <div class="section-header" data-animate="fade-up">
        <h2 class="section-title">Hot Promotions</h2>
        <p class="section-subtitle">Don't miss out on these amazing deals</p>
      </div>

      <div class="promotions-grid">
        <div
          v-for="(promo, index) in promotions"
          :key="index"
          class="promo-card"
          data-animate="slide-up"
          :data-delay="promo.delay"
        >
          <div class="promo-badge" :class="promo.badgeClass">
            {{ promo.badge }}
          </div>
          <div class="promo-content">
            <h3>{{ promo.title }}</h3>
            <p class="promo-discount">{{ promo.discount }}</p>
            <p class="promo-description">{{ promo.description }}</p>
            <p class="promo-date">{{ promo.date }}</p>
            <button 
              @click="navigateToEvent(promo.id)" 
              class="promo-link"
            >
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.promotions {
  background: linear-gradient(180deg, var(--dark-light) 0%, var(--dark) 100%);
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.promo-card {
  background: var(--dark-light);
  border-radius: 20px;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.promo-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.promo-card:hover::before {
  transform: scaleX(1);
}

.promo-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.promo-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.promo-badge.new {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: var(--dark);
}

.promo-badge.hot {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: var(--white);
}

.promo-badge.exclusive {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: var(--white);
}

.promo-content h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--white);
}

.promo-discount {
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
}

.promo-description {
  color: var(--light-gray);
  line-height: 1.8;
  margin-bottom: 15px;
  font-size: 1rem;
}

.promo-date {
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 20px;
  font-style: italic;
}

.promo-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
}

.promo-link:hover {
  gap: 10px;
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .promotions-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .promo-card {
    padding: 30px 25px;
  }

  .promo-content h3 {
    font-size: 1.5rem;
  }

  .promo-discount {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .promo-card {
    padding: 25px 20px;
  }

  .promo-content h3 {
    font-size: 1.25rem;
  }

  .promo-discount {
    font-size: 1.75rem;
  }

  .promo-badge {
    padding: 6px 16px;
    font-size: 0.7rem;
  }
}
</style>
