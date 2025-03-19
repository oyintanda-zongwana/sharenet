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
            <th @click="sortBy('fullName')">Full Name</th>
            <th @click="sortBy('categoryName')">Category</th>
            <th @click="sortBy('price')">Price</th>
            <th @click="sortBy('move')">Move</th>
            <th @click="sortBy('pmove')">% Move</th>
            <th @click="sortBy('datetime')">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spot in sortedSpots" :key="spot.code">
            <td>{{ spot.fullName }}</td>
            <td>{{ spot.categoryName }}</td>
            <td>{{ spot.price.toFixed(2) }}</td>
            <td :class="{ positive: spot.move > 0, negative: spot.move < 0 }">
              {{ spot.move.toFixed(2) }}
            </td>
            <td
              :class="{
                positive: spot.pmove > 0,
                negative: spot.pmove < 0,
              }"
            >
              {{ spot.pmove.toFixed(2) }}%
            </td>
            <td>{{ formatTime(spot.datetime) }}</td>
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
  fullName: string;
  price: number;
  move: number;
  pmove: number;
  datetime: string;
  code: string;
  categoryName: string;
}

export default defineComponent({
  name: "HomeView",
  setup() {
    const spots = ref<Spot[]>([]);
    const sortKey = ref<keyof Spot>("fullName");
    const sortOrder = ref<"asc" | "desc">("asc");
    const error = ref<string | null>(null);

    const fetchSpots = async () => {
      try {
        const response = await axios.get(
          "https://api.sharenet.co.za/api/v1/px2/spots"
        );
        // Extract spots array from response
        const data = response.data?.spots || [];
        spots.value = Array.isArray(data) ? data : [];
        error.value = null;
      } catch (err: any) {
        console.error("Error fetching spots:", err);
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
      error,
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
