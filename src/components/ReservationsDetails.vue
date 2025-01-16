

<template>
<div class = "container">
  <h3 class="text-center mb-4">Confirmed Reservations</h3>
</div>
  <p class="lead">
    You can find your confirmed Reservations from this page.  <br><br>
    Older-ones are on top and new orders are on the bottom.
  </p>

  <div class="container my-4 p-3 rounded shadow-sm" style="background-color: #f8f9fa;">
    <div class="table-responsive">
    <table class="table table-bordered table-hover">

    <thead class="table-dark">
      <tr>
        <th>Reservation nr</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Routes</th>
        <th>Total Quoted price</th>
        <th>Total Quoted Travel Time</th>
        <th>Companies</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(reservation) in reservations" :key="reservation.id">
        <td>{{ reservation.id }}</td>
        <td>{{ reservation.firstName }}</td>
        <td>{{ reservation.lastName }}</td>
        <td>
          <ul class="mb-0">
            <li v-for="route in reservation.routes" :key="route">{{ route }}</li>
          </ul>
        </td>
        <td>{{ reservation.totalQuotedPrice.toFixed(2) }}</td>
        <td>{{ reservation.totalQuotedTravelTime }}</td>

        <td>
          <ul class="mb-0">
            <li v-for="company in reservation.companyNames" :key="company">{{ company }}</li>
          </ul>
        </td>

      </tr>
    </tbody>

  </table>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { API } from '../apiConfig.js'; // Import the API config

export default {
  data: () => ({
    reservationsApi: API.reservationsApi,
      reservations: [],
    }),

  methods: {
    fetchReservations() {
      axios.get(`${this.reservationsApi}/all-reservations`)
      .then(response => (this.reservations = response.data))
    }
  },

  mounted() {
    this.fetchReservations();
  }
};
</script>


<style scoped>
.table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  justify-content: center;
}
.container {
  padding: 20px;
  margin: 0 auto;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
}
.table th {
  background-color: rgba(28, 83, 104, 0.96);
}
.container {
  display: block;
}

@media (max-width: 768px) {
  .table {
    font-size: 14px; /* Adjust font size for smaller screens */
  }
  th, td {
    padding: 8px; /* Adjust padding for smaller screens */
  }
}

</style>