<template>
  <div>
    <div class="modal-overlay" @click="closeAndReset" v-if="modal.showModal">
      <div class="modal-box" @click.stop>
        <component :is="getDynamicComponent"></component>
        <button
          class="closeBtn"
          aria-label="Dismiss alert"
          type="button"
          @click="closeAndReset"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CreateAuthor from "./Forms/CreateAuthor.vue";
import EditAuthor from "./Forms/EditAuthor.vue";
import CreatePost from "./Forms/CreatePost.vue";
import EditPost from "./Forms/EditPost.vue";
import DeleteAuthor from "./Forms/DeleteAuthor.vue";
import DeletePost from "./Forms/DeletePost.vue";

export default {
  name: "Modal",
  props: {
    modal: {
      type: Object,
      required: true,
    }
  },
  components: {
    CreateAuthor,
    CreatePost,
    EditAuthor,
    EditPost,
    DeleteAuthor,
    DeletePost,
  },
  methods: {
    closeAndReset() {
      this.$emit("close");
      this.authorName = "";
      this.postTitle = "";
      this.postAuthor = null;
      this.postContent = "";
    },
  },
  computed: {
    getDynamicComponent() {
      const modalType = this.modal.modalType;
      switch (modalType) {
        case "authorCreate":
          return { ...CreateAuthor, props: { author: this.author } };
        case "authorUpdate":
          return { ...EditAuthor, props: { author: this.author } };
        case "postCreate":
          return { ...CreatePost, props: { post: this.post } };
        case "postUpdate":
          return {...EditPost}
        case "authorDelete":
          return DeleteAuthor;
        case "postDelete":
          return DeletePost;
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  border: 5px solid;
  border-radius: 20px;
  padding: 10px;
  width: 20rem;
  background-color: rgb(215, 226, 198);
  min-height: 100px;
  overflow: hidden;
  box-shadow: 10px 10px 5px #888888;
}

.closeBtn {
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
