<template>
  <div>
    <input @input="handleInput" type="text" v-model="search" :placeholder="'Search ' + searchItem">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    searchItem: String
  },
  data() {
    return {
      search: '',
      debounceTimeout: null
    }
  },
  computed: {
  ...mapGetters(["getAuthors", "getPosts"]),
  },
  methods: {
    handleInput() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        this.$emit("filterItems", this.search);
      }, 300);
    }
  },
  beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  },
  watch: {
    getAuthors: function () {
      if(!(this.searchItem == "post")) {
        this.search = ''
      }
    },
    getPosts: function () {      
        this.search = ''    
    }
  }
}
</script>
