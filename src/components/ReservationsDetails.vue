

<template>
<div class = "container">
  <h3 class="text-center mb-4">Confirmed Reservations</h3>
</div>

  <div class="container" style="background-color: #f8f9fa; padding: 0px; margin: 20px">
    <div style="overflow-x: auto; width: 100%;">
    <table class="table table-bordered table-hover" style="width: 100%; table-layout: auto;">

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
          <ul>
            <li v-for="route in reservation.routes" :key="route">{{ route }}</li>
          </ul>
        </td>
        <td>{{ reservation.totalQuotedPrice.toFixed(2) }}</td>
        <td>{{ reservation.totalQuotedTravelTime }}</td>

        <td>
          <ul>
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

export default {
  data: () => ({
    reservationsApi: "http://localhost:8090/api/reservations",
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
  width: 90%;
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