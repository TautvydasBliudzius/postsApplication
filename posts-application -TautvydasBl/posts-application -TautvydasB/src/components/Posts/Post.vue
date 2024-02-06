<template>
  <div class="postBox" v-if="post.author">
    <div>
      <div><b>Post Title:</b> {{ post.title }}</div>
      <div><b>Author:</b> {{ post.author.name }}</div>

      <div class="contentBox" v-if="isSinglePostView">
        <b>Content:</b> {{ post.body }}
      </div>

      <div v-if="post.created_at < post.updated_at">
        <b>Updated:</b> {{ formatDate(post.updated_at) }}
      </div>

      <div v-else><b>Created:</b> {{ formatDate(post.created_at) }}</div>
    </div>

    <div class="buttonsBox">
      <div class="modalButton">
        <button @click="editPost">Update post</button>
      </div>

      <div class="modalButton">
        <button @click="deletePost">Delete post</button>
      </div>

      <router-link :to="getPostLocation()" v-if="!isSinglePostView">
        <Button>Open Post</Button>
      </router-link>
    </div>
  </div>
</template>
<script>
import mixin from "../../mixins/formatDateMixin";
import { mapMutations } from "vuex";
export default {
  mixins: [mixin],
  props: {
    post: Object,
    isSinglePostView: false,
  },
  methods: {
    ...mapMutations(["OPEN_MODAL"]),
    editPost() {
      this.OPEN_MODAL({
        type: "postUpdate",
        post: this.post,
        postId: this.post.id,
        postTitle: this.post.title,
        postContent: this.post.body,
      });
    },
    deletePost() {
      this.OPEN_MODAL({
        type: "postDelete",
        post: this.post,
        postId: this.post.id,
        postTitle: this.post.title,
      });  
    },
    getPostLocation() {
      const id = this.post.id;
      return `/posts/${id}`;
    },
  },
};
</script>

<style scoped>
.postBox {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0.2rem 2rem;
  text-align: left;
  margin: 1rem 30%;
}

.contentBox {
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
}
</style>
