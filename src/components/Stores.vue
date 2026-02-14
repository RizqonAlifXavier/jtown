<script setup>
import { ref } from "vue";

const storesByFloor = ref([
  {
    floor: "Ground Floor",
    stores: [
      {
        name: "Yoshinoya",
        category: "Japanese Food Restaurant",
        logo: "/logo/yoshinoya.png",
      },
      {
        name: "Solaria",
        category: "Indonesian Food Restaurant",
        logo: "/logo/solaria.png",
      },
      {
        name: "Fore Coffee",
        category: "Coffee & Beverages",
        logo: "/logo/fore-sg.png",
      },
      {
        name: "Coffee Agam",
        category: "Coffee & Beverages",
        logo: "/logo/agam web.png",
      },
      {
        name: "Pisang Goreng Madu Bu Nanik",
        category: "Snacks & Desserts",
        logo: "/logo/Logo PGM PNG.png",
      },
      {
        name: "Paparonz Pizza",
        category: "Italian Food Restaurant",
        logo: "/logo/paparonz.png",
      },
    ],
  },
  {
    floor: "Floor 1",
    stores: [
      {
        name: "Sate Malibu",
        category: "Indonesian Food Restaurant",
        logo: "/logo/Sate Malibu Tegal.png",
      },
      {
        name: "Kiddie Crabs",
        category: "Playground",
        logo: "/logo/logo Kiddie Crab.png",
      },
      {
        name: "Gemilang Edukasi Indonesia (GEI)",
        category: "Education",
        logo: "/logo/Gemilang.png",
      },
      {
        name: "Gereja GBI",
        category: "Community",
        logo: "/logo/Logo GBI new.png",
      },
      {
        name: "Bakso Abang",
        category: "Indonesian Food Restaurant",
        logo: "/logo/bakso abang web.png",
      },
      {
        name: "Bakmie Now",
        category: "Noodles Restaurant",
        logo: "/logo/Bakmi Now Logo.png",
      },
      {
        name: "Dapur Biranda",
        category: "Indonesian Food Restaurant",
        logo: "/logo/Dapur Biranda.png",
      },
      {
        name: "Street Sushi",
        category: "Japanese Food Restaurant",
        logo: "/logo/Street Sushi.png",
      },
      {
        name: "Ayam Berkah",
        category: "Indonesian Food Restaurant",
        logo: "/logo/AyBer Signature.png",
      },
      {
        name: "Teh Kotjok",
        category: "Beverages",
        logo: "/logo/teh kotjok.png",
      },
    ],
  },
  {
    floor: "Floor 2",
    stores: [
      {
        name: "Anytime Fitness",
        category: "Gym & Fitness",
        logo: "/logo/Anytime-Fitness-logowhite.png",
      },
      {
        name: "Outbreak",
        category: "Entertainment",
        logo: "/logo/Outbreak 1.jpg",
      },
      { name: "Tomlex", category: "Bar & lounge", logo: "/logo/tomlex.png" },
    ],
  },
  {
    floor: "Rooftop",
    stores: [
      {
        name: "Padeleon",
        category: "Sports & Recreation",
        logo: "https://via.placeholder.com/150x80/06FFA5/000000?text=Padeleon",
        comingSoon: true,
      },
    ],
  },
]);
</script>

<template>
  <section id="stores" class="stores-section section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="text-gradient">Our Tenants</h2>
        <p>Berbagai tenant pilihan di setiap lantai JTown Mall</p>
      </div>

      <div class="floors-container">
        <div
          v-for="(floorData, index) in storesByFloor"
          :key="index"
          class="floor-section"
        >
          <div class="floor-header">
            <h3 class="floor-title">{{ floorData.floor }}</h3>
          </div>
          <div class="stores-grid">
            <div
              v-for="(store, storeIndex) in floorData.stores"
              :key="storeIndex"
              class="store-card glass-card"
              :class="{ 'coming-soon': store.comingSoon }"
            >
              <div class="store-logo-container">
                <img
                  :src="store.logo"
                  :alt="store.name"
                  class="store-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="store-info">
                <div class="store-name">{{ store.name }}</div>
                <div class="store-category">{{ store.category }}</div>
              </div>
              <div v-if="store.comingSoon" class="coming-soon-badge">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stores-section {
  padding: 100px 0;
  background: transparent;
}

.floors-container {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.floor-section {
  width: 100%;
}

.floor-header {
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: rgba(16, 185, 129, 0.15);
  border-left: 4px solid var(--color-emerald);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);
}

.floor-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.store-card {
  text-align: center;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.store-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.3);
}

.store-card.coming-soon {
  opacity: 0.8;
  border: 2px dashed rgba(16, 185, 129, 0.5);
}

.store-logo-container {
  width: 150px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.store-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.store-info {
  width: 100%;
}

.store-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.store-category {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.coming-soon-badge {
  margin-top: 0.5rem;
  display: inline-block;
  padding: 0.4rem 1.2rem;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

@media (max-width: 768px) {
  .stores-section {
    padding: 60px 0;
  }

  .stores-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .floor-title {
    font-size: 1.5rem;
  }

  .floor-header {
    padding: 1rem 1.5rem;
  }

  .store-name {
    font-size: 1.125rem;
  }

  .store-logo-container {
    width: 130px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .stores-section {
    padding: 40px 0;
  }

  .stores-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .floor-title {
    font-size: 1.25rem;
    letter-spacing: 1px;
  }

  .floor-header {
    padding: 0.875rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .store-card {
    padding: 1.5rem 1.25rem;
  }

  .store-name {
    font-size: 1rem;
  }

  .store-category {
    font-size: 0.8rem;
  }

  .store-logo-container {
    width: 120px;
    height: 65px;
  }
}
</style>
