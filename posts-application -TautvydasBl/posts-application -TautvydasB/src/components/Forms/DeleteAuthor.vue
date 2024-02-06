<template>
  <form @submit.prevent="deleteAuthor">
    <h2>Delete author</h2>
    <hr />
    <div>
      Are you sure you want to delete
      {{ this.$store.state.AuthorsMod.editingAuthorName }} from the list?
    </div>
    <br />
    <button type="submit" class="submitBtn">Yes</button>
  </form>
</template>

<script>
export default {
  methods: {
    deleteAuthor() {
      const authorId = this.$store.state.AuthorsMod.editingAuthorId;
      this.$store.dispatch("deleteAuthor", authorId);
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
