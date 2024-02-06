<template>
  <div>
    <div class="modalButton">
      <button @click="createPost">Create new post</button>
    </div>
    <PostsList/>
  </div>
</template>

<script>
import PostsList from '../components/Posts/PostsList.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    PostsList
},
methods: {
    ...mapMutations(["OPEN_MODAL"]),
    createPost() {
      this.OPEN_MODAL({
        type: "postCreate",
        post: this.post,
      });
    },
  },
}
</script>