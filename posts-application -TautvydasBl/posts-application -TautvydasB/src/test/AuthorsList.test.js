import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Vuex from "vuex";
import AuthorsList from "../components/Authors/AuthorsList.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AuthorsList.vue", () => {
  let store;
  let state;
  let getters;
  let actions
  let mutations

  beforeEach(() => {
    state = {
      authors: [],
      paginatedAuthors: [
        {
          id: 1,
          name: "Oliver",
          created_at: "2023-05-31",
          updated_at: "2023-12-15T08:36:43.795Z",
        },
        {
          id: 2,
          name: "Evelyn",
          created_at: "2023-05-31",
          updated_at: "2023-12-14T12:03:28.043Z",
        },
      ],
      editingAuthorId: null,
      editingAuthorName: null,
    };
    getters = {
      getAuthors: (state) => state.authors,
    };

    actions = {
      async fetchAuthors({ commit }) {
        commit("setAuthors", [
          {
            id: 1,
            name: "Oliver",
            created_at: "2023-05-31",
            updated_at: "2023-12-15T08:36:43.795Z",
          },
          {
            id: 2,
            name: "Evelyn",
            created_at: "2023-05-31",
            updated_at: "2023-12-14T12:03:28.043Z",
          },
        ]);
      },
    };

    mutations = {
      setAuthors(state, authors) {
        state.authors = authors;
      },
    };

    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations,
    });
  });

  it("Checks paginatedAuthors", async () => {
    const wrapper = mount(AuthorsList, { store, localVue });
    const computedPaginatedAuthors = wrapper.vm.getAuthors.length;
    const expectedPaginatedAuthors = state.paginatedAuthors.length;
    expect(computedPaginatedAuthors).to.equal(expectedPaginatedAuthors);
  });
});
