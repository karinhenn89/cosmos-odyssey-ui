

<template>
  <footer class="text pt-3 mt-auto">
    <div class="container ">
      <div class="row justify-content-between align-items-center">

        <div class="col-5 mb-3 d-flex justify-content-start px-2">
          <nav>
            <router-link to="/" class="text-decoration-none text mx-5">Home</router-link>
            <router-link to="/reservations" class="text-decoration-none text mx-5">Reservations</router-link>
          </nav>
        </div>

        <div class="col-4 mb-3 text-end px-5">
          <p class="mb-1">
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