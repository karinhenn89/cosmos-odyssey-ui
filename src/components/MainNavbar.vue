

<template>
  <div id="navbar" class="container-fluid">
    <div class="image-container">
      <img :src="imagePath" alt="Cosmos" class="responsive-image">>

    </div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light w-100 navbar-custom ">

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link to="/" class="nav-link fs-5 border-secondary border-end">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reservations" class="nav-link fs-5 border-secondary border-end">Reservations</router-link>
            </li>
          </ul>
        </div>

      </nav>

  </div>
</template>

<script >
import cosmosImage from '@/assets/cosmos.png';

export default {
  data() {
    return {
      imagePath: cosmosImage
    };
  }
};
</script>


<style scoped>
.image-container {
  padding: 10px; /* Padding around the image container */
  display: flex; /* Optional: to center the image within the container */
  justify-content: center; /* Optional: centers the image horizontally */
  align-items: center; /* Optional: centers the image vertically */
}

.responsive-image {
  width: 100%; /* Set a percentage width to make it smaller */
  max-width: 750px; /* Maximum size of the image */
  height: auto; /* Maintain the aspect ratio */
  border-radius: 8px; /* Optional: rounded corners */
}
@media (max-width: 768px) {
  .image-container {
    padding: 10px; /* Less padding on smaller screens */
  }

  .responsive-image {
    width: 90%; /* Slightly smaller width for smaller screens */
  }
}
.flex-container img {
  max-width: 100%;
  height: auto;
}
#navbar{
  border-collapse: collapse;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow */
  background-color: #1c5368;
  color: #cccccc;
}
.navbar-custom {
  background-color: #f4f7f8 !important;

}

input {
  background-color: #42b983;
}

</style>