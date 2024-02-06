<template>
  <div v-if="getAuthors.length > 0">
    <div>
      There are {{ this.filteredAuthors.length }} authors found in the list
    </div>
    <hr />
    <Search searchItem="author" @filterItems="filteredArray" />
    <div v-if="filteredMessage" class="filteredMessage">{{ this.filteredMessage }}</div>
    <pagination
      v-if="pageCount > 0"
      :total="filteredAuthors.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @pageChanged="handlePageChanged"
    />
    <div v-for="author in paginatedAuthors" :key="author.id">
      <Author :author="author" />
    </div>
  </div>
  <div v-else>There are no authors</div>
</template>

<script>
import Author from "./Author.vue";
import { mapActions, mapGetters } from "vuex";
import Pagination from "../Pagination.vue";
import Search from "../Search.vue";

export default {
  components: {
    Author,
    Pagination,
    Search,
  },
  data() {
    return {
      itemsPerPage: 5,
      currentPage: 1,
      filteredAuthors: [],
      filteredMessage: null
    };
  },
  async created() {
    await this.fetchAuthors();
    this.filteredAuthors = this.getAuthors;
  },
  computed: {
    ...mapGetters(["getAuthors"]),
    pageCount() {
      return Math.ceil(this.filteredAuthors.length / this.itemsPerPage);
    },
    paginatedAuthors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAuthors.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["fetchAuthors"]),
    handlePageChanged(page) {
      this.currentPage = page;
    },
    filteredArray(letters) {
      if (letters.length > 0) {
        const filtered = this.getAuthors.filter((author) =>
          author.name.toLowerCase().includes(letters.toLowerCase())
        );
        if(filtered.length > 0) {
          this.currentPage = 1
          this.filteredAuthors = filtered
          this.filteredMessage = null
        } else {
          this.filteredMessage = "Authors not found"
        }
      } else if(letters.length == 0) {
        this.filteredAuthors = this.getAuthors;
      }
    },
  },
  watch: {
    pageCount: function () {
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount;
      }
    },
    getAuthors: function () {
      this.filteredAuthors = this.getAuthors;
    }
  },
};
</script>
