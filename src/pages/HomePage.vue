<template>
  <homePageComponent/>
  <RoutesTable/>

</template>


<script>

import HomePageComponent from "@/components/HomePageComponent.vue";
import RoutesTable  from "@/components/RoutesTable.vue";

export default {
  name: 'HomePage',

  components: {
    HomePageComponent,
    RoutesTable,
  },
}

</script>

<style scoped>

</style>