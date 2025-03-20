<template>
  <div class="app">
    <nav>
      <div class="container">
        <router-link to="/" class="logo">Sharenet</router-link>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/workshops">Workshops</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </nav>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>About Sharenet</h3>
          <p>Your trusted partner in workshop management and spot price tracking.</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/workshops">Workshops</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: info@sharenet.co.za</li>
            <li>Phone: +27 123 456 789</li>
            <li>Address: Cape Town, South Africa</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Sharenet. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import './assets/styles/main.css'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
