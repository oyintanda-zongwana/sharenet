<template>
  <div class="workshops">
    <h1>Available Workshops</h1>
    <div class="workshops-container">
      <div class="filters">
        <label>
          <input
            type="checkbox"
            v-model="showOnlyAvailable"
            @change="filterWorkshops"
          />
          Show only available workshops
        </label>
      </div>

      <div class="workshops-grid">
        <div
          v-for="workshop in filteredWorkshops"
          :key="workshop.id"
          class="workshop-card"
        >
          <h3>{{ workshop.title }}</h3>
          <p class="date">{{ formatDate(workshop.date) }}</p>
          <p class="venue">{{ workshop.venue }}</p>
          <p class="seats">Available Seats: {{ workshop.availableSeats }}</p>
          <button
            @click="bookWorkshop(workshop)"
            :disabled="workshop.availableSeats === 0"
            :class="{ booked: workshop.availableSeats === 0 }"
          >
            {{ workshop.availableSeats === 0 ? "Sold Out" : "Book Now" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import axios from "axios";

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
    const workshops = ref<Workshop[]>([
      {
        id: 1,
        title: "Introduction to Trading",
        date: "2024-04-15",
        venue: "Sharenet Training Room",
        availableSeats: 5,
      },
      {
        id: 2,
        title: "Advanced Technical Analysis",
        date: "2024-04-20",
        venue: "Sharenet Training Room",
        availableSeats: 0,
      },
      {
        id: 3,
        title: "Options Trading Workshop",
        date: "2024-05-01",
        venue: "Sharenet Training Room",
        availableSeats: 8,
      },
      {
        id: 4,
        title: "Portfolio Management",
        date: "2024-05-15",
        venue: "Sharenet Training Room",
        availableSeats: 3,
      },
    ]);

    const showOnlyAvailable = ref(false);

    const filteredWorkshops = computed(() => {
      if (!showOnlyAvailable.value) {
        return workshops.value;
      }
      return workshops.value.filter((workshop) => workshop.availableSeats > 0);
    });

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const bookWorkshop = async (workshop: Workshop) => {
      try {
        // In a real application, this would be your API endpoint
        const response = await axios.post(
          "https://api.sharenet.co.za/api/v1/workshops/book",
          {
            workshopId: workshop.id,
            date: workshop.date,
          }
        );

        if (response.data.success) {
          // Update local state
          workshop.availableSeats--;
          alert("Workshop booked successfully!");
        }
      } catch (error) {
        console.error("Error booking workshop:", error);
        alert("Failed to book workshop. Please try again.");
      }
    };

    return {
      workshops,
      filteredWorkshops,
      showOnlyAvailable,
      formatDate,
      bookWorkshop,
    };
  },
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.workshop-card h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.date,
.venue,
.seats {
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

@media (max-width: 768px) {
  .workshops-grid {
    grid-template-columns: 1fr;
  }
}
</style>
