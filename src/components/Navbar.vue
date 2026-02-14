<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false);

const scrollToSection = (sectionId) => {
  if (router.currentRoute.value.path !== '/') {
    router.push('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  isMenuOpen.value = false;
};

const goHome = () => {
  router.push('/');
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <div class="logo" @click="goHome">
          <img 
            src="../logo/JTOWN Black no Background.png" 
            alt="JTown Logo" 
            class="logo-image"
            fetchpriority="high"
            decoding="async"
            width="200"
            height="55"
          />
        </div>
        
        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-links" :class="{ 'active': isMenuOpen }">
          <a @click="scrollToSection('home')">Home</a>
          <a @click="scrollToSection('events')">Events</a>
          <a @click="scrollToSection('features')">Features</a>
          <a @click="scrollToSection('stores')">Stores</a>
          <a @click="scrollToSection('contact')">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-image {
  height: 55px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logo h2 {
  margin: 0;
  font-size: 1.25rem;
  white-space: nowrap;
  text-align: left;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: var(--color-light);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a:hover {
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .logo {
    gap: 0.4rem;
  }

  .logo h2 {
    font-size: 1.125rem;
  }

  .logo-image {
    height: 48px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 0;
  }

  .logo {
    gap: 0.35rem;
  }

  .logo-image {
    height: 42px;
  }

  .logo h2 {
    font-size: 1rem;
    line-height: 1.3;
  }

  .menu-toggle {
    display: flex;
    z-index: 1001;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 100px 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.3s ease;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-links.active {
    right: 0;
  }

  .nav-links a {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .logo {
    gap: 0.3rem;
  }

  .logo-image {
    height: 38px;
  }

  .logo h2 {
    font-size: 0.875rem;
  }

  .logo:hover {
    transform: scale(1.02);
  }
}
</style>
