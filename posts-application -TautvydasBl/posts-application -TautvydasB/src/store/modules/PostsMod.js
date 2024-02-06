const state = {
  posts: [],
  post: null,
  editingPostId: null,
  editingPostTitle: null,
  editingPostContent: null
};

const getters = {
  getPosts: (state) => state.posts,
  getPost: (state) => state.post,
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      const posts = await this.getData(`/posts?_expand=author`);
      commit("SET_POSTS", posts);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Posts data is loaded",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to load posts data",
      });
    }
  },

  async fetchSinglePost({ commit }, id) {
    try {
      const post = await this.getData(`/posts/${id}?_expand=author`);
      commit("SET_POST", post);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Post data is loaded",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to load post data",
      });
    }
  },

  async createNewPost({ commit, dispatch }, newPost) {
    try {
      const response = await this.postData("/posts", newPost);
      commit("CREATE_NEW_POST", response);
      await dispatch("fetchPosts")
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Post created successfully",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to create post",
      });
    } finally {
      commit("CLOSE_MODAL")
      
    }
  },
  async updatePost({ commit, dispatch }, payload) {
    try {
      await this.patchData(`/posts/${payload.id}`, payload);
      commit("UPDATE_POST", payload);
      await dispatch("fetchSinglePost", payload.id)
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Post updated successfully",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to update post",
      });
    } finally {
      commit("CLOSE_MODAL");
    }
  },
  async deletePost({ commit }, id) {
    try {
      await this.deleteData(`/posts/${id}`);
      commit("DELETE_POST", id);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Post deleted successfully",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to delete post",
      });
    } finally {
      commit("CLOSE_MODAL");
    }
  },
};

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POST(state, post) {
    state.post = post;
  },
  CREATE_NEW_POST(state, post) {
    state.posts.push(post);
  },
  UPDATE_POST(state, updatedPost) {
    const index = state.posts.findIndex(post => post.id == updatedPost.id)

    if (index != -1) {
      state.posts[index].title = updatedPost.title
      state.posts[index].body = updatedPost.body
      state.posts[index].update_at = updatedPost.update_at
    }
  },
  DELETE_POST(state, id) {
    const index = state.posts.findIndex(post => post.id === id)
    if(index != -1){
      state.posts.splice(index, 1)
    }
  } 
};

export default {
  state,
  getters,
  actions,
  mutations,
};
