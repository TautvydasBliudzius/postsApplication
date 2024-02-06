<template>
  <div>
    <div class="modalButton">
      <button @click="createAuthor">Create new author</button>
    </div>
    <AuthorsList />
  </div>
</template>

<script>
import AuthorsList from "../components/Authors/AuthorsList.vue";
import Modal from "../components/Modal.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    AuthorsList,
    Modal,
  },
  methods: {
    ...mapMutations(["OPEN_MODAL"]),
    createAuthor() {
      this.OPEN_MODAL( {
        type: "authorCreate",
        author: this.author,
      });
    },
  },
};
</script>

<style scoped>
  .modalButton {
    margin-top: 2rem;
  }
</style>
