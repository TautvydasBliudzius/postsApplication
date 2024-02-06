<template>
  <form @submit.prevent="deletePost">
    <h2>Delete post</h2>
    <hr />
    <div>
      Are you sure you want to delete
      <br />
      <b>"{{ this.$store.state.PostsMod.editingPostTitle }}"</b>
      <br />
      post from the list?
    </div>
    <br />
    <button type="submit" class="submitBtn">Yes</button>
  </form>
</template>

<script>
export default {
  methods: {
    deletePost() {
      this.$store.dispatch(
        "deletePost",
        this.$store.state.PostsMod.editingPostId
      );
      if (!(this.$route.path == "/posts")) {
        this.$router.push("/posts");
      }
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
