

<template>
  <main-navbar/>
  <reservations-details />
  <FooterComponent/>

</template>


<script>

import ReservationsDetails from "@/components/ReservationsDetails.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "ReservationsPage",
  components: {
    MainNavbar,
    ReservationsDetails,
    FooterComponent,
  },
}

</script>

<style scoped>

</style>