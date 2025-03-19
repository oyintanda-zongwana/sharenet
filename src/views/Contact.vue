<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <div class="contact-container">
      <div class="contact-info">
        <h2>Sharenet Contact Details</h2>
        <div class="info-item">
          <h3>Address</h3>
          <p>Sharenet (Pty) Ltd</p>
          <p>Block A, Clearwater Office Park</p>
          <p>Atlas Road, Boksburg</p>
          <p>1459, South Africa</p>
        </div>
        <div class="info-item">
          <h3>Contact Numbers</h3>
          <p>Tel: +27 (0)11 305 3000</p>
          <p>Fax: +27 (0)11 305 3001</p>
          <p>Email: info@sharenet.co.za</p>
        </div>
      </div>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.9024424301397!2d28.23737531501093!3d-26.20140938378927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9510c2b0f0a9a9%3A0x1e9510c2b0f0a9a9!2sSharenet!5e0!3m2!1sen!2sza!4v1647600000000!5m2!1sen!2sza"
          width="100%"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactView",
});
</script>

<style scoped>
.contact {
  padding: 20px;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 20px;
}

.contact-info {
  text-align: left;
}

.info-item {
  margin-bottom: 30px;
}

.info-item h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.info-item p {
  margin: 5px 0;
  color: #666;
}

.map-container {
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 300px;
  }
}
</style> 