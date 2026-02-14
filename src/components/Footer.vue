<script setup>
// Footer component
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="text-gradient-green">JTown Food & Entertainments Center </h3>
          <p>Your ultimate shopping destination</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#features">Features</a>
          <a href="#stores">Stores</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="https://www.facebook.com/jtownmall/" class="social-icon" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="https://www.instagram.com/jtown.mall/" class="social-icon" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" class="social-icon" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
            <a href="#" class="social-icon" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 JTown Mall. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 3rem 0 2rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
}

.footer-section h4 {
  color: var(--color-text);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.footer-section p {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.footer-section a {
  display: block;
  color: var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--color-primary);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 50px !important;
  height: 50px !important;
  display: grid !important;
  place-items: center !important;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  color: var(--color-text);
  flex-shrink: 0;
  text-decoration: none;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  font-size: 0 !important;
  line-height: 0 !important;
}

.social-icon svg {
  width: 20px !important;
  height: 20px !important;
  display: block;
  margin: 0 !important;
  padding: 0 !important;
}

.social-icon:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-5px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.footer-bottom p {
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-section h3 {
    font-size: 1.5rem;
  }

  .footer-section h4 {
    font-size: 1.125rem;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0 1rem;
  }

  .footer-section h3 {
    font-size: 1.25rem;
  }

  .social-icon {
    width: 45px;
    height: 45px;
  }
}
</style>
