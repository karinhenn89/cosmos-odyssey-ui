

<template>
<div></div>

  <div>
    <br>
    {{pricelist}}
    <br>
    <br>
    <br>
  </div>

<!--  <table class="table">-->
<!--    <thead>-->
<!--    <tr>-->
<!--      <th>From Planet</th>-->
<!--      <th class="text-center">To Planet</th>-->
<!--      <th class="text-center">Distance between</th>-->
<!--    </tr>-->
<!--    </thead>-->

<!--    <tbody>-->
<!--    <tr v-for="item in fetchRoutes" :key="item">-->
<!--      <td>{{ item.from.name }}</td>-->
<!--      <td class="text-center">{{  item.to.name }}</td>-->
<!--      <td class="text-center">{{  item.distance }}</td>-->

<!--    </tr>-->
<!--    </tbody>-->
<!--  </table>-->

  <div>
    <h2>Select Origin and Destination</h2>

    <!-- Dropdown for Origin (fromOptions) -->
    <label for="from">From:</label>
    <select v-model="selectedFrom" id="from">
      <option value="" disabled>Select origin</option>
      <option v-for="from in fromOptions" :key="from" :value="from">
        {{ from }}
      </option>
    </select>

    <!-- Dropdown for Destination (toOptions) -->
    <label for="to">To:</label>
    <select v-model="selectedTo" id="to">
      <option value="" disabled>Select destination</option>
      <option v-for="to in toOptions" :key="to" :value="to">
        {{ to }}
      </option>
    </select>

    <!-- Display Selected Values -->
    <div v-if="selectedFrom && selectedTo" class="selected-info">
      <p>You selected:</p>
      <p>From: {{ selectedFrom }}</p>
      <p>To: {{ selectedTo }}</p>
    </div>
  </div>


</template>


<script>
import axios from "axios";


export default {
  data: () => ({
    routesApi: "http://localhost:8090/api",
    fromOptions: [],
    toOptions: [],
    selectedFrom: '',
    selectedTo: ''
  }),
  computed: {
    // Enable the search button only if both dropdowns have a value
    canSearch() {
      return this.selectedFrom && this.selectedTo;
    },
  },
    methods: {
      fetchLocations() {
        axios.get(`${this.routesApi}/routes/locations`)
            .then(res => {

              // Extract fromOptions and toOptions from the response
              this.fromOptions = res.data.fromOptions;
              this.toOptions = res.data.toOptions;
            })
            .catch(error => {
              console.error('Error fetching routes:', error);
            });
      },
      searchRoutes() {
        // Perform the search logic here
        console.log("Searching for routes from", this.selectedFrom, "to", this.selectedTo);

        // You can add logic to make another API call for searching routes
        axios.get(`${this.routesApi}/routes/search`, {
          params: {
            fromName: this.selectedFrom,
            toName: this.selectedTo
          }
        })
            .then(res => {
              console.log("Search Results:", res.data);
            })
            .catch(error => {
              console.error('Error searching routes:', error);
            });
      }

    },
    mounted() {
      this.fetchLocations();
      // this.pricelistIsValid();
    },
  }

</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  justify-content: center;
  display: flex;
  overflow-x: auto;
}
.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  width: 300px;
}
.table th {
  background-color: #f4f4f4;
}
</style>