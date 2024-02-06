<template>
  <div>
    <div>
      <ul class="paginationItem">
        <button class="prevPage" @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span
          v-if="
            totalPages > 3 &&
            !(currentPage == 1) &&
            !(currentPage == 2)
          "
        >          
          <button
            @click="goToPage(1)"
            :disabled="currentPage === 1"
          >
            {{ 1 }}
          </button>
          <span>...</span>
        </span>

        <li v-for="page in pages" :key="page.name" class="paginationItem">
          <button @click="goToPage(page.name)" :disabled="page.isDisabled">
            {{ page.name }}
          </button>
        </li>

        <span
          v-if="
            totalPages > 3 &&
            !(currentPage == totalPages) &&
            !(currentPage == totalPages - 1)
          "
        >
          <span>...</span>
          <button
            @click="goToPage(totalPages)"
            :disabled="currentPage === totalPages"
          >
            {{ totalPages }}
          </button>
        </span>
        <button class="nextPage" @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </ul>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: 5,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      maxVisibleButtons: 3,
    };
  },
  methods: {
    firstPage() {
      this.$emit("pageChanged", 1);
    },
    prevPage() {
      this.$emit("pageChanged", this.currentPage - 1);
    },
    nextPage() {
      this.$emit("pageChanged", this.currentPage + 1);
    },
    lastPage() {
      this.$emit("pageChanged", this.totalPages);
    },
    goToPage(page) {
      this.$emit("pageChanged", page);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.itemsPerPage);
    },
    startPage() {
      if (this.currentPage === 1 || this.currentPage === 2) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
  watch: {
    total: function () {
      if(this.totalPages == 1) {
      this.$emit("pageChanged", this.currentPage - 1);
      }
      if(this.currentPage > this.totalPages){
        this.currentPage = this.totalPages
      }
    },
  },
};
</script>

<style scoped>
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}

.paginationItem {
  display: inline-block;
  align-items: center;
}

ul {
  margin-bottom: 0rem;
  padding-left: 0;
}

button {
  margin: 0rem 0.35rem;
}
</style>
