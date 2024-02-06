<template>
  <div class="home">
    <h1>Welcome to Posts application</h1>
    <h3>Select below what you would like to see</h3>
    <div>
      <CustomButton text="Authors" location="/authors" />
      <CustomButton text="Posts" location="/posts" />
    </div>
  </div>
</template>

<script>
import CustomButton from "../components/Buttons/CustomButton.vue";

export default {
  components: { CustomButton },
};
</script>
