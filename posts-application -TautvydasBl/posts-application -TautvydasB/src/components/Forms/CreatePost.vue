<template>
  <form @submit.prevent="createPost">
    <h2>Create new post</h2>
    <hr />
    <ValidationObserver ref="observer">
      <label for="cars">Choose an author:</label>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <select v-model="selectedAuthor" name="authors">
          <option
            v-for="author in getAuthors"
            :key="author.id"
            :value="author.id"
          >
            {{ author.name }}
          </option>
        </select>
        <div>{{ errors[0] }}</div>
      </ValidationProvider>
    </ValidationObserver>

    <ValidationProvider
      ref="validationProvider"
      rules="minmaxTitle:1,30"
      v-slot="{ errors }"
    >
      <input
        v-model="postTitle"
        type="text"
        placeholder="Enter title"
        class="textInput"
        required
        minlength="1"
        maxlength="30"
      />
      <div v-for="error in errors" :key="error">{{ error }}</div>
      <br />
    </ValidationProvider>

    <ValidationProvider
      ref="validationProvider"
      rules="minmaxPost:1,500"
      v-slot="{ errors }"
    >
      <textarea
        v-model="postContent"
        placeholder="Enter content"
        class="contentTextInput"
        rows="5"
        required
        minlength="1"
        maxlength="500"
      ></textarea>
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
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ValidationProvider,
  },
  props: {
    isInputEmpty: false,
  },
  data() {
    return {
      selectedAuthor: null,
      postTitle: "",
      postContent: "",
    };
  },
  async created() {
    await this.fetchAuthors();
  },
  computed: {
    ...mapGetters(["getAuthors"]),
  },
  methods: {
    ...mapActions(["createNewPost", "fetchAuthors"]),
    createPost() {
      const date = new Date().toJSON();

      this.$refs.validationProvider.validate();

      if (
        this.$refs.validationProvider.errors.length > 0 ||
        this.selectedAuthor == null
      ) {
        return;
      }
      const postData = {
        title: this.postTitle,
        body: this.postContent,
        authorId: this.selectedAuthor,
        created_at: date,
        updated_at: date,
      };
      this.createNewPost(postData);
    },
  },
};
</script>

<style>
.textInput {
  margin-bottom: 1rem;
}
</style>
