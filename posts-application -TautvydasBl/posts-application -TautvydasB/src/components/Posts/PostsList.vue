<template>
  <div v-if="getPosts.length > 0">
    <div>There are {{ filteredPosts.length }} posts found in the list</div>
    <hr />
    <Search searchItem="post" @filterItems="filteredArray"/>
    <div v-if="filteredMessage" class="filteredMessage">{{ this.filteredMessage }}</div>
    <pagination
      v-if="pageCount > 1"
      :total="filteredPosts.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @pageChanged="handlePageChanged"
    />

    <div v-for="post in paginatedPosts" :key="post.id">
      <Post :post="post" />
    </div>
  </div>
  <div v-else>There are no posts</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pagination from "../Pagination.vue";
import Post from "./Post.vue";
import Search from "../Search.vue";

export default {
  components: {
    Pagination,
    Post,
    Search,
  },
  data() {
    return {
      itemsPerPage: 5,
      currentPage: 1,
      filteredPosts: [],
      filteredMessage: null
    };
  },
  async created() {
    await this.fetchPosts();
    this.filteredPosts = this.getPosts;
  },
  computed: {
    ...mapGetters(["getPosts"]),
    pageCount() {
      return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPosts.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    handlePageChanged(page) {
      this.currentPage = page;
    },
    filteredArray(letters) {
      if (letters.length > 0) {
        const filtered = this.getPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(letters.toLowerCase()) ||
            post.author.name.toLowerCase().includes(letters.toLowerCase())
        )
        if(filtered.length > 0) {
          this.currentPage = 1
          this.filteredPosts = filtered
          this.filteredMessage = null
        } else {
          this.filteredMessage = "Posts not found"
        }
      } else if(letters.length == 0) {
        this.filteredPosts = this.getPosts;
      }
    }   
  },
  watch: {
    pageCount: function () {
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount;
      }
    },
    getPosts: function () {
      this.filteredPosts = this.getPosts
    }
  },
};
</script>
