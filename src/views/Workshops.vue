<template>
  <div class="workshops">
    <h1>Available Workshops</h1>
    <div class="workshops-container">
      <div class="filters">
        <label>
          <input type="checkbox" v-model="showOnlyAvailable">
          Show only available workshops
        </label>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-else-if="loading" class="loading-message">
        Loading workshops...
      </div>
      
      <div v-else class="workshops-grid">
        <div v-for="workshop in filteredWorkshops" :key="workshop.id" class="workshop-card">
          <h3>{{ workshop.title }}</h3>
          <p class="date">{{ formatDate(workshop.date) }}</p>
          <p class="venue">{{ workshop.venue }}</p>
          <p class="seats">Available Seats: {{ workshop.availableSeats }}</p>
          <button 
            @click="bookWorkshop(workshop)"
            :disabled="workshop.availableSeats === 0"
            :class="{ 'booked': workshop.availableSeats === 0 }">
            {{ workshop.availableSeats === 0 ? 'Sold Out' : 'Book Now' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";

interface Spot {
  code: string;
  fullName: string;
  categoryName: string;
  price: number;
  move: number;
  pmove: number;
  datetime: string;
}

interface Workshop {
  id: number;
  title: string;
  date: string;
  venue: string;
  availableSeats: number;
}

export default defineComponent({
  name: "WorkshopsView",
  setup() {
    const workshops = ref<Workshop[]>([]);
    const showOnlyAvailable = ref(false);
    const error = ref<string | null>(null);
    const loading = ref(true);

    const transformSpotToWorkshop = (spot: Spot, index: number): Workshop => {
      // Create a workshop from spot data
      const date = new Date(spot.datetime);
      // Add 1-7 days to the spot datetime to create workshop dates
      date.setDate(date.getDate() + (index % 7) + 1);
      
      return {
        id: index + 1,
        title: `${spot.fullName} Trading Workshop`,
        date: date.toISOString(),
        venue: "Sharenet Training Room",
        availableSeats: Math.floor(Math.random() * 10) // Random seats for demo
      };
    };

    const fetchWorkshops = async () => {
      try {
        loading.value = true;
        error.value = null;
        const response = await axios.get('https://api.sharenet.co.za/api/v1/px2/spots');
        const spots = response.data.spots;
        
        // Transform spots into workshops
        workshops.value = spots.map((spot: Spot, index: number) => 
          transformSpotToWorkshop(spot, index)
        );
      } catch (err: unknown) {
        console.error('Error fetching workshops:', err);
        error.value = 'Failed to fetch workshops. Please try again later.';
        workshops.value = [];
      } finally {
        loading.value = false;
      }
    };

    const filteredWorkshops = computed(() => {
      if (!showOnlyAvailable.value) {
        return workshops.value;
      }
      return workshops.value.filter(workshop => workshop.availableSeats > 0);
    });

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const bookWorkshop = async (workshop: Workshop) => {
      try {
        // Since we're using the spots API, we'll simulate the booking
        if (workshop.availableSeats > 0) {
          workshop.availableSeats--;
          alert('Workshop booked successfully!');
        }
      } catch (err: unknown) {
        console.error('Error booking workshop:', err);
        alert('Failed to book workshop. Please try again.');
      }
    };

    onMounted(() => {
      fetchWorkshops();
      // Refresh workshops data every 5 minutes
      setInterval(fetchWorkshops, 5 * 60 * 1000);
    });

    return {
      workshops,
      filteredWorkshops,
      showOnlyAvailable,
      formatDate,
      bookWorkshop,
      error,
      loading
    };
  }
});
</script>

<style scoped>
.workshops {
  padding: 20px;
}

.workshops-container {
  max-width: 1200px;
  margin: 0 auto;
}

.filters {
  margin-bottom: 20px;
  text-align: left;
}

.filters label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.workshops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.workshop-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: left;
}

.workshop-card h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.date, .venue, .seats {
  margin: 5px 0;
  color: #666;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #3aa876;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.booked {
  background-color: #dc3545;
}

@media (max-width: 768px) {
  .workshops-grid {
    grid-template-columns: 1fr;
  }
}

.error-message {
  color: #dc3545;
  padding: 20px;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 20px 0;
}

.loading-message {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style> 