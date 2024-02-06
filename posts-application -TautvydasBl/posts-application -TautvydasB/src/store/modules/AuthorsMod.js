const state = {
  authors: [],
  editingAuthorId: null,
  editingAuthorName: null,
};

const getters = {
  getAuthors: (state) => state.authors,
};

const actions = {
  async fetchAuthors({ commit }) {
    try {
      const authors = await this.getData("/authors");
      commit("SET_AUTHORS", authors);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Authors data is loaded",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to load authors data",
      });
    }
  },
  async createNewAuthor({ commit }, payload) {
    try {
      const response = await this.postData("/authors", payload);
      commit("CREATE_NEW_AUTHOR", response);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Author created successfully",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to create author",
      });
    } finally {
      commit("CLOSE_MODAL");
    }
  },
  async updateAuthor({ commit }, payload) {
    try {
      await this.patchData(`/authors/${payload.id}`, payload);
      commit("UPDATE_AUTHOR", payload);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Author updated successfully",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to update author",
      });
    } finally {
      commit("CLOSE_MODAL");
    }
  },
  async deleteAuthor({ commit }, id) {
    try {
      await this.deleteData(`/authors/${id}`);
      commit("DELETE_AUTHOR", id);
      commit("PUSH_NOTIFICATION", {
        type: "success",
        message: "Author deleted successfully",
      });
    } catch (error) {
      commit("PUSH_NOTIFICATION", {
        type: "failed",
        message: "Failed to delete author",
      });
    } finally {
      commit("CLOSE_MODAL");
    }
  },
};

const mutations = {
  SET_AUTHORS(state, authors) {
    state.authors = authors;
  },
  CREATE_NEW_AUTHOR(state, author) {
    state.authors.push(author);
  },
  DELETE_AUTHOR(state, id) {
    const indexInAuthors = state.authors.findIndex((author) => author.id === id);
    if (indexInAuthors !== -1) {
      state.authors.splice(indexInAuthors, 1);
    }
  },
  UPDATE_AUTHOR(state, updatedAuthor) {
    const index = state.authors.findIndex(
      (author) => author.id === updatedAuthor.id
    );
    if (index !== -1) {
      state.authors[index].name = updatedAuthor.name;
      state.authors[index].updated_at = updatedAuthor.updated_at;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
