

<template>

  <div class="container" style="background-color: #f8f9fa;">
  <table class="table table-bordered table-hover" style="width: 100%; table-layout: auto;">

    <thead>
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
      <tr v-for="(reservation, index) in reservations" :key="reservation.id">
        <td>{{ index + 1 }}</td>
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

</style>