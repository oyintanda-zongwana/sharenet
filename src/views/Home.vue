<template>
  <div class="home">
    <h1>Sharenet Spot Prices</h1>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="spots.length === 0" class="loading-message">
      Loading spot prices...
    </div>
    <div v-else class="table-container">
      <table class="spots-table">
        <thead>
          <tr>
            <th @click="sortBy('FullName')">Full Name</th>
            <th @click="sortBy('Price')">Price</th>
            <th @click="sortBy('Move')">Move</th>
            <th @click="sortBy('PercentageMove')">Percentage Move</th>
            <th @click="sortBy('Time')">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spot in sortedSpots" :key="spot.FullName">
            <td>{{ spot.FullName }}</td>
            <td>{{ spot.Price }}</td>
            <td :class="{ positive: spot.Move > 0, negative: spot.Move < 0 }">
              {{ spot.Move }}
            </td>
            <td
              :class="{
                positive: spot.PercentageMove > 0,
                negative: spot.PercentageMove < 0,
              }"
            >
              {{ spot.PercentageMove.toFixed(2) }}%
            </td>
            <td>{{ formatTime(spot.Time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";

interface Spot {
  FullName: string;
  Price: number;
  Move: number;
  PercentageMove: number;
  Time: string;
}

export default defineComponent({
  name: "HomeView",
  setup() {
    const spots = ref<Spot[]>([]);
    const sortKey = ref<keyof Spot>("FullName");
    const sortOrder = ref<"asc" | "desc">("asc");
    const error = ref<string | null>(null);

    const fetchSpots = async () => {
      try {
        const response = await axios.get(
          "https://api.sharenet.co.za/api/v1/px2/spots"
        );
        // Ensure we have an array of spots
        const data = response.data;
        spots.value = Array.isArray(data) ? data : [];
        error.value = null;
      } catch (error) {
        console.error("Error fetching spots:", error);
        spots.value = [];
        error.value = "Failed to fetch spot prices. Please try again later.";
      }
    };

    const sortBy = (key: keyof Spot) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = key;
        sortOrder.value = "asc";
      }
    };

    const sortedSpots = computed(() => {
      if (!Array.isArray(spots.value)) {
        return [];
      }
      return [...spots.value].sort((a, b) => {
        const aValue = a[sortKey.value];
        const bValue = b[sortKey.value];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder.value === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortOrder.value === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
    });

    const formatTime = (time: string) => {
      return new Date(time).toLocaleString();
    };

    onMounted(() => {
      fetchSpots();
      // Refresh data every 5 minutes
      setInterval(fetchSpots, 5 * 60 * 1000);
    });

    return {
      spots,
      sortedSpots,
      sortBy,
      formatTime,
    };
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
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

.table-container {
  overflow-x: auto;
  margin: 20px 0;
}

.spots-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  max-width: 1200px;
}

.spots-table th,
.spots-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.spots-table th {
  background-color: #f8f9fa;
  cursor: pointer;
  user-select: none;
}

.spots-table th:hover {
  background-color: #e9ecef;
}

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}

@media (max-width: 768px) {
  .spots-table {
    font-size: 14px;
  }

  .spots-table th,
  .spots-table td {
    padding: 8px;
  }
}
</style>
