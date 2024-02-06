<template>
  <div>
    <div>
      <h2>Edit Post</h2>
      <hr />
      <div>
        You editing 
        <br>
        <b>{{ this.$store.state.PostsMod.editingPostTitle }}</b>
        <br>
         post
      </div>
      <form @submit.prevent="updatePost">
        <ValidationProvider
          ref="validationProvider"
          rules="minmaxTitle:1,30"
          v-slot="{ errors }"
        >
          <input
            v-model="newPostTitle"
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
            v-model="newPostContent"
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
        <button type="submit">Update post</button>
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
      newPostTitle: this.$store.state.PostsMod.editingPostTitle,
      newPostContent: this.$store.state.PostsMod.editingPostContent,
    };
  },
  methods: {
    updatePost() {
      const date = new Date().toJSON();
      this.$refs.validationProvider.validate();

      if (this.$refs.validationProvider.errors.length > 0) {
        return;
      }
      const updatedPost = {
        id: this.$store.state.PostsMod.editingPostId,
        title: this.newPostTitle,
        body: this.newPostContent,
        updated_at: date,
      };
      this.$store.dispatch("updatePost", updatedPost);
    },
  },
};
</script>
