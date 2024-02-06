<template>
  <div>
    <router-link to="/posts"><button>Back to posts list</button></router-link>
    <hr />
    <div v-if="getPost">
      <Post :post="getPost" isSinglePostView="true" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Post from "../components/Posts/Post.vue";

export default {
  components: {
    Post,
  },
  computed: {
    ...mapGetters(["getPost"]),
  },
  async created() {
    const postId = this.$route.params.id;
    await this.fetchSinglePost(postId);
  },
  methods: {
    ...mapActions(["fetchSinglePost"]),
  },
};
</script>

<style scoped>
.singlePostBox {
  border: 1px black solid;
  border-radius: 20px;
  margin: 2rem 20rem;
  padding: 2rem;
  text-align: left;
}
</style>
