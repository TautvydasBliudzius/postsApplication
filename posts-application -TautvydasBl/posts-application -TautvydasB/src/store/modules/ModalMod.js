const state = {
  modal: {
    showModal: false,
    modalType: "",
  },
};
const mutations = {
  OPEN_MODAL(state, payload) {
    state.modal.showModal = true;
    state.modal.modalType = payload.type;
    if (payload.authorId) {
      this.state.AuthorsMod.author = payload.author;
      this.state.AuthorsMod.editingAuthorId = payload.authorId;
      this.state.AuthorsMod.editingAuthorName = payload.authorName;
    }
    if (payload.post) {
      this.state.PostsMod.post = payload.post;
      this.state.PostsMod.editingPostId = payload.postId;
      this.state.PostsMod.editingPostTitle = payload.postTitle;
      this.state.PostsMod.editingPostContent = payload.postContent;
    }
  },
  CLOSE_MODAL(state) {
    state.modal.showModal = false;
    state.modal.modalType = "";
    this.state.AuthorsMod.editingAuthorId = null;
    this.state.AuthorsMod.editingAuthorName = null;
  },
};

export default {
  state,
  mutations,
};
