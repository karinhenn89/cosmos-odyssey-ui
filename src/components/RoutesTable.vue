

<template>


  <div>
  <div class="container my-5 p-4 rounded shadow-lg" style="background-color: #f8f9fa;">
    <h3 class="text-center mb-4">Select Origin and Destination</h3>
    <br>

    <div class="row g-3 align-items-center mb-4">
      <!-- Origin Dropdown -->
      <div class="col-md-6">
    <!-- Dropdown for Origin (fromOptions) -->
    <label for="from" class="form-label">Choose a planet to fly from: </label>
    <select v-model="selectedFrom" id="from" class="form-select" @change="fetchToOptions">
      <option value="" disabled>From:</option>
      <option v-for="from in fromOptions" :key="from" :value="from">
        {{ from }}
      </option>
    </select>
      </div>

    <!-- Dropdown for Destination (toOptions) -->
      <div class="col-md-6">
        <label for="to">Choose a planet to fly to: </label>
        <select v-model="selectedTo" id="to" class="form-select" :disabled="!selectedFrom">
          <option value="" disabled>To: </option>
          <option v-for="to in toOptions" :key="to" :value="to">
            {{ to }}
           </option>
    </select>
      </div>
    </div>
    <!-- Button to Search for Routes -->
    <div class="text-center mt-4">
      <button :disabled="!selectedFrom || !selectedTo"
            @click="searchRoutes"
            class="btn btn-outline-primary px-4"
          >
            Search Routes
      </button>
    </div>
    <br>
    <!-- Display Selected Values -->
    <div v-if="selectedFrom && selectedTo" class="selected-info">
      <p>You selected your trip: </p>
      <p>From: <strong>{{ selectedFrom }}</strong>   To: <strong>{{ selectedTo }}</strong></p>
    </div>

    </div>






    <!-- Table to Display Search Results -->
    <div v-if="searchResults.length">
      <h3 class="mb-4">Search Results</h3>

      <!-- Filter Input -->

      <div class="container my-4 p-3 rounded shadow-sm" style="background-color: #f8f9fa;">
        <div class="row g-3 align-items-center">
          <!-- Filter by Company -->
          <div class="col-md-6 d-flex align-items-center">
            <label for="companyFilterDropdown" class="me-2">Filter by Company:</label>
            <select id="companyFilterDropdown" v-model="companyFilter" class="form-select">
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
          <div class="col-md-6 d-flex align-items-center">
             <label for="sortOption" class="me-2">Sort by:</label>
             <select id="sortOption" v-model="sortOption" class="form-select">
                <option value="price">Price</option>
                <option value="distance">Distance</option>
                <option value="travelTime">Travel Time</option>
           </select>
          </div>
        </div>
      </div>





        <div class="container" style="background-color: #f8f9fa;">
          <div style="overflow-x: auto; width: 100%;">
          <table class="table table-bordered table-hover" style="width: 100%; table-layout: auto;">

            <thead class="table-dark">
              <tr>
<!--                <th>validUntil</th>-->
                <th>Company</th>
                <th>Flight Start</th>
                <th>Flight End</th>
                <th>Travel Time</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Book a trip</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(result, index) in filteredAndSortedResults" :key="index">
<!--                <td>{{ result.validUntil }}</td>-->
                <td>{{ result.companyName }}</td>
                <td>{{ formatDate(result.flightStart) }}</td>
                <td>{{ formatDate(result.flightEnd) }}</td>
                <td>{{ calculateTravelTime(result.flightStart, result.flightEnd) }}</td> <!-- Travel Time Column -->
                <td>{{ result.distance }}</td>
                <td>{{ formatPrice(result.price) }}</td>
                <td>
                  <button @click="addRouteToReservation(result)"
                          class="btn btn-outline-primary btn-sm"
                          >
                          Reserve
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="container" style="background-color: #f8f9fa;">
        <h3>Current Reservation Details</h3>

        <table style="border: 1px solid; margin: 0 auto; padding: 30px;">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Routes</th>
            <th>Total Price</th>
            <th>Total Travel Time</th>
            <th>Companies</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ reservation.firstName }}</td>
            <td>{{ reservation.lastName }}</td>
            <td>
              <ul>
                <li v-for="(route, index) in reservation.routes" :key="index">
                  {{ route }}
                </li>
              </ul>
            </td>
            <td>{{ formatPrice(reservation.totalQuotedPrice) }}</td>
            <td>{{ reservation.totalQuotedTravelTime }}</td>
            <td>
              <ul>
                <li v-for="(company, index) in reservation.companyNames" :key="index">
                  {{ company }}
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    <div class="my-4">
      <form @submit.prevent="saveReservation" class="bg-light p-4 rounded shadow-sm">
        <h4>Reserve Your Trip</h4>
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name:</label>
            <input v-model="reservation.firstName" id="firstName" class="form-control" required />
          </div>

        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name:</label>
          <input v-model="reservation.lastName" id="lastName" class="form-control" required />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-outline-primary btn-sm">Save Reservation</button>
          <button @click="clearReservation" class="btn btn-outline-danger btn-sm">Clear Reservation</button>
        </div>
      </form>
    </div>

  </div>
  </div>




</template>


<script>
import axios from "axios";


export default {
  data: () => ({
    routesApi: "http://localhost:8090/api",
    reservationsApi: "http://localhost:8090/api/reservations",
    fromOptions: [],
    toOptions: [],
    selectedFrom: '',
    selectedTo: '',
    searchResults: [],
    companyFilter:"",
    sortOption: "price",
    reservation: {
      firstName:'',
      lastName:'',
      routes:[],
      totalQuotedPrice: 0,
      totalQuotedTravelTime: '0h 0m',
      companyNames: [],
      validUntil: ''
    }
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

      //for one single route
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
      // Method to add travel times
      addTravelTimes(totalTime, additionalTime) {
        // Parse total time (e.g., "5h 30m")
        const [totalHours, totalMinutes] = totalTime.match(/\d+/g).map(Number);

        // Parse additional time (e.g., "2h 45m")
        const [additionalHours, additionalMinutes] = additionalTime.match(/\d+/g).map(Number);

        // Calculate total minutes and hours
        let minutes = totalMinutes + additionalMinutes;
        let hours = totalHours + additionalHours + Math.floor(minutes / 60);
        minutes %= 60;

        // Return formatted time string
        return `${hours}h ${minutes}m`;
      },

      formatPrice(price) {
        return `$${price.toFixed(2)}`; // Format price as currency
      },

      addRouteToReservation(route) {
        this.reservation.routes.push(`${this.selectedFrom} - ${this.selectedTo}`);
        this.reservation.totalQuotedPrice += route.price;
        this.reservation.companyNames.push(route.companyName);
        this.reservation.validUntil = route.validUntil;

        // Calculate total travel time
        const travelTime = this.calculateTravelTime(route.flightStart, route.flightEnd);
        this.reservation.totalQuotedTravelTime = this.addTravelTimes(
            this.reservation.totalQuotedTravelTime,
            travelTime
        );
      },

      clearReservation() {
        this.reservation = {
          firstName: '',
          lastName: '',
          routes: [],
          totalQuotedPrice: 0,
          totalQuotedTravelTime: '0h 0m',
          companyNames: []
        }
      },

      saveReservation() {
        console.log('Reservation to be sent:', this.reservation);
        // Call API to save reservation
        axios.post(`${this.reservationsApi}/add`, this.reservation)
            .then(response => {
              console.log('Server Response:', response.data);
              alert('Reservation saved successfully!');
            })
            .catch(error => {
              console.error('Error saving reservation:', error);
            });
      }



    },
    mounted() {
      this.fetchFromOptions();
      // this.pricelistIsValid();
    },
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

.table-wrapper {
  overflow-x: auto; /* Allow horizontal scrolling when necessary */
  width: 100%; /* Ensure the wrapper takes up the full width of the container */
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