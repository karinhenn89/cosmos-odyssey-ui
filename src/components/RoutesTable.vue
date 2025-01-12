

<template>
<div></div>



  <div>
    <h2>Select Origin and Destination</h2>

    <!-- Dropdown for Origin (fromOptions) -->
    <label for="from">From:</label>
    <select v-model="selectedFrom" id="from" @change="fetchToOptions">
      <option value="" disabled>Select origin</option>
      <option v-for="from in fromOptions" :key="from" :value="from">
        {{ from }}
      </option>
    </select>

    <!-- Dropdown for Destination (toOptions) -->
    <label for="to">To:</label>
    <select v-model="selectedTo" id="to" :disabled="!selectedFrom">
      <option value="" disabled>Select destination</option>
      <option v-for="to in toOptions" :key="to" :value="to">
        {{ to }}
      </option>
    </select>

    <!-- Display Selected Values -->
    <div v-if="selectedFrom && selectedTo" class="selected-info">
      <p>You selected your trip: </p>
      <p>From: <strong>{{ selectedFrom }}</strong>   To: <strong>{{ selectedTo }}</strong></p>
    </div>

    <!-- Button to Search for Routes -->
    <button :disabled="!selectedFrom || !selectedTo" @click="searchRoutes">
      Search Routes
    </button>

    <!-- Table to Display Search Results -->
    <div v-if="searchResults.length">
      <h3>Search Results</h3>

      <!-- Filter Input -->
      <div>
        <label for="companyFilterDropdown">Filter by Company:</label>
        <select id="companyFilterDropdown" v-model="companyFilter">
          <option value="">All Companies</option> <!-- Default option to show all companies -->
          <option
              v-for="(company, index) in uniqueCompanies"
              :key="index"
              :value="company"
          >
            {{ company }}
          </option>
        </select>
      </div>

      <!-- Sort Options -->
      <div>
        <label for="sortOption">Sort by:</label>
        <select id="sortOption" v-model="sortOption">
          <option value="price">Price</option>
          <option value="distance">Distance</option>
          <option value="travelTime">Travel Time</option>
        </select>
      </div>




      <table border="1">
        <thead>
        <tr>
          <th>Company</th>
          <th>Flight Start</th>
          <th>Flight End</th>
          <th>Travel Time</th>
          <th>Distance</th>
          <th>Price</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="(result, index) in filteredAndSortedResults" :key="index">
          <td>{{ result.companyName }}</td>
          <td>{{ formatDate(result.flightStart) }}</td>
          <td>{{ formatDate(result.flightEnd) }}</td>
          <td>{{ calculateTravelTime(result.flightStart, result.flightEnd) }}</td> <!-- Travel Time Column -->
          <td>{{ result.distance }}</td>
          <td>{{ formatPrice(result.price) }}</td>




        </tr>
        </tbody>
      </table>
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
    selectedTo: '',
    searchResults: [],
    companyFilter:"",
    sortOption: "price"
  }),
  computed: {
    // Enable the search button only if both dropdowns have a value
    canSearch() {
      return this.selectedFrom && this.selectedTo;
    },
    uniqueCompanies() {
      // Get a list of unique company names from searchResults
      const companies = this.searchResults.map((result) => result.companyName);
      return [...new Set(companies)]; // Remove duplicates
    },
    filteredAndSortedResults() {
      // Apply filtering
      let results = this.searchResults.filter((result) => {
        if (this.companyFilter === "") {
          return true; // No filter applied, include all results
        }
        return result.companyName === this.companyFilter; // Match selected company
      });

      // Apply sorting
      results.sort((a, b) => {
        if (this.sortOption === "price") {
          return a.price - b.price;
        } else if (this.sortOption === "distance") {
          return a.distance - b.distance;
        } else if (this.sortOption === "travelTime") {
          return a.travelTimeMs - b.travelTimeMs; // Use precomputed travel time in ms
        }
      });

      return results;
    },
  },
    methods: {
      fetchFromOptions() {
        axios
            .get(`${this.routesApi}/routes/locations`) // Backend endpoint for fetching all origins
            .then((res) => {
              this.fromOptions = res.data.fromOptions || []; // Populate fromOptions
            })
            .catch((error) => {
              console.error("Error fetching from options:", error);
            });
      },

      // Fetch "toOptions" based on selected origin
      fetchToOptions() {
        if (!this.selectedFrom) return; // Ensure an origin is selected

        axios
            .get(`${this.routesApi}/routes/locations/${this.selectedFrom}`) // Backend endpoint for fetching destinations
            .then((res) => {
              this.toOptions = res.data.toOptions || []; // Populate toOptions
            })
            .catch((error) => {
              console.error("Error fetching to options:", error);
            });
      },

        searchRoutes(){

          console.log("Searching for routes from", this.selectedFrom, "to", this.selectedTo);

          if (!this.selectedFrom || !this.selectedTo) {
            console.error("From and To fields must be selected");
            return;
          }

          axios.get(`${this.routesApi}/getproviders`, {
            params: {
              fromName: this.selectedFrom,
              toName: this.selectedTo,
            },
          })
              .then(res => {
                console.log("Search Results:", res.data);
                this.searchResults = res.data.map(result => ({
                  ...result,
                  travelTimeMs: new Date(result.flightEnd) - new Date(result.flightStart), // Precompute travel time in ms
                }));
              })
              .catch(error => {
                console.error("Error searching routes:", error);
              });
        },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      calculateTravelTime(flightStart, flightEnd) {
        const startDate = new Date(flightStart);
        const endDate = new Date(flightEnd);

        // Calculate the difference in milliseconds
        const diffInMilliseconds = endDate - startDate;

        // Convert milliseconds to hours and minutes
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        // Return formatted travel time
        return `${hours}h ${minutes}m`;
      },
      formatPrice(price) {
        return `$${price.toFixed(2)}`; // Format price as currency
      },
    },
    mounted() {
      this.fetchFromOptions();
      // this.pricelistIsValid();
    },
  };

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