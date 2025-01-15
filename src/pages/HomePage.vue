<template>
  <MainNavbar />
  <homePageComponent/>
  <RoutesTable/>
  <footer-component/>

</template>


<script>
import MainNavbar from "@/components/MainNavbar.vue";
import HomePageComponent from "@/components/HomePageComponent.vue";
import RoutesTable  from "@/components/RoutesTable.vue";
import FooterComponent from "@/components/FooterComponent.vue";


export default {
  name: 'HomePage',

  components: {
    FooterComponent,
    MainNavbar,
    HomePageComponent,
    RoutesTable,

  },
}

</script>

<style scoped>

</style>