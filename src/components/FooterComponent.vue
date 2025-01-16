

<template>
  <footer class="text pt-3 mt-auto">
    <div class="container ">
      <div class="row text-center text-md-start justify-content-between align-items-center">

        <div class="col-12 col-md-5 mb-3 px-2">
          <nav class="d-flex justify-content-center justify-content-md-start">
            <router-link to="/" class="text-decoration-none text mx-5">Home</router-link>
            <router-link to="/reservations" class="text-decoration-none text">Reservations</router-link>
          </nav>
        </div>

        <div class="col-12 col-md-4 mb-3 px-2">
          <p class="mb-1 text-center text-md-end" style="margin-right: 2rem;">
             Come visit me On Earth!
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
  border-top: 1px solid #eaeaea;
  border-collapse: collapse;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow */
  background-color: #1c5368;
  color: white;
}

footer a {
  color: white;
  text-decoration: none;
}

</style>