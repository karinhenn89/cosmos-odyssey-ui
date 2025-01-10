

<template>

  <div>
    <h1>Welcome to my Cosmos Odyssey tickets web application</h1>
    <p>You can find a suitable tickets for your cosmos trip from planets to planets.
    You are more than welcome to look around</p>
    <div class="image-container">
      <img :src="imagePath" alt="Cosmos" class="responsive-image">
    </div>



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
  width: 80%; /* Set a percentage width to make it smaller */
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
</style>