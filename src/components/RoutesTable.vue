

<template>
<div></div>

  <div>
    <br>
    {{pricelist}}
    <br>
    <br>
    <br>
  </div>

  <table class="table">
    <thead>
    <tr>
      <th>From Planet</th>
      <th class="text-center">To Planet</th>
      <th class="text-center">Distance between</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="item in fetchRoutes" :key="item">
      <td>{{ item.from.name }}</td>
      <td class="text-center">{{  item.to.name }}</td>
      <td class="text-center">{{  item.distance }}</td>

    </tr>
    </tbody>
  </table>

</template>


<script>
import axios from "axios";


export default {
data: () =>({
  routesApi: "http://localhost:8090/api",
  storeRoute: [],
  pricelist: '',
}),
  methods: {
    fetchRoutes() {
      axios.all([
          axios.get(`${this.routesApi}/routes`).then(res =>(this.storeRoute = res.data)),
      ]);
    },

    pricelistIsValid() {
      axios.get(`${this.routesApi}/is-valid`).then(res =>(this.pricelist = res.data));
    }
  },
  mounted() {
    this.fetchRoutes();
    this.pricelistIsValid();
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