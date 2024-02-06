<template>
  <div>
    <div>
      <div>Author name: {{ author.name }}</div>
      <div v-if="author.created_at < author.updated_at">
        Updated: {{ formatDate(author.updated_at) }}
      </div>
      <div v-else>Created: {{ formatDate(author.created_at) }}</div>
      <div>
        <button class="updateButton" @click="updateAuthor">Update author</button>
      </div>
      <div>
        <button class="deleteButton" @click="deleteAuthor">Delete author</button>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import mixin from "../../mixins/formatDateMixin"

export default {
  mixins: [mixin],
  props: {
    author: Object,
  },
  methods: {
    ...mapMutations(["OPEN_MODAL"]),
    updateAuthor() {
      this.OPEN_MODAL( {
        type: "authorUpdate",
        author: this.author,
        authorName: this.author.name,
        authorId: this.author.id,
      });
    },
    deleteAuthor() {
      this.OPEN_MODAL({
        type: "authorDelete",
        authorName: this.author.name,
        authorId: this.author.id
      });
    }
  },
};
</script>
