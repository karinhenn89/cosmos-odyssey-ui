<template>

  <div id="app">
    <router-view />

  </div>

</template>

<script>


export default {
  name: 'App',
  components: {},

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* Default margins for larger screens */
  margin: 60px;
}

/* Adjust margins for smaller screens */
@media (max-width: 768px) {
  #app {
    margin: 20px; /* Reduce margins on mobile */
    text-align: left; /* Optional: Align text to the left for readability */
  }
}

@media (max-width: 480px) {
  #app {
    margin: 10px; /* Further reduce margins for very small screens */
    font-size: 14px; /* Adjust font size if needed */
  }
}

</style>
