<template>
  <form @submit.prevent="createAuthor">
    <h2>Create new author</h2>
    <hr />
    <ValidationProvider
      ref="validationProvider"
      rules="specChars|nameFirstSymbol|minmax:3,15|nameIncludesDots|nameIncludesSpaces"
      v-slot="{ errors }"
    >
      <input
        v-model="authorName"
        type="text"
        placeholder="Enter new author's name"
        class="textInput"
        required
        minlength="3"
        maxlength="15"
      />
      <div v-for="error in errors" :key="error">{{ error }}</div>
      <br />
    </ValidationProvider>
    <br />
    <button type="submit" class="submitBtn">Submit</button>
  </form>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import "../../validationProvider/validationProvider";
import { mapActions } from "vuex";

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      authorName: "",
    };
  },
  methods: {
    ...mapActions(["createNewAuthor"]),
    createAuthor() {
      this.$refs.validationProvider.validate();

      if (this.$refs.validationProvider.errors.length > 0) {
        return;
      }
      const date = new Date().toJSON();
      const authorData = {
        name: this.authorName,
        created_at: date,
        updated_at: date,
      };
      this.createNewAuthor(authorData);
    },
  },
};
</script>

<style>
.textInput {
  margin-bottom: 1rem;
}
</style>
