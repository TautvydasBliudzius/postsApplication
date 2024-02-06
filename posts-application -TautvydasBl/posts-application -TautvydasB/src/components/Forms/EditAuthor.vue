<template>
  <div>
    <div>
      <h2>Edit Author</h2>
      <hr />
      <div>
        You editing <b>{{ this.$store.state.AuthorsMod.editingAuthorName }}</b> name
      </div>
      <form @submit.prevent="updateAuthor">
        <ValidationProvider
          ref="validationProvider"
          rules="specChars|nameFirstSymbol|minmax:3,15|nameIncludesDots|nameIncludesSpaces"
          v-slot="{ errors }"
        >
          <input
            v-model="newAuthorName"
            id="newAuthorName"
            type="text"
            class="textInput"
            required
            minlength="3"
            maxlength="15"
          />
          <div v-for="error in errors" :key="error">{{ error }}</div>
          <br />
        </ValidationProvider>
        <button type="submit">Update Author</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import "../../validationProvider/validationProvider";
export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      newAuthorName: this.$store.state.AuthorsMod.editingAuthorName,
    };
  },
  methods: {
    updateAuthor() {
      const date = new Date().toJSON();
      this.$refs.validationProvider.validate();

      if (this.$refs.validationProvider.errors.length > 0) {
        return;
      }
      const updatedAuthor = {
        id: this.$store.state.AuthorsMod.editingAuthorId,
        name: this.newAuthorName,
        updated_at: date,
      };
      this.$store.dispatch("updateAuthor", updatedAuthor);
    },
  },
};
</script>
