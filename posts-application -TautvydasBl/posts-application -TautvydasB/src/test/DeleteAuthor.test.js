import { mount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import DeleteAuthor from "../components/Forms/DeleteAuthor.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("DeleteAuthor.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      deleteAuthor: vi.fn(),
    };

    store = new Vuex.Store({
      actions,
      state: {
        AuthorsMod: {
          editingAuthorName: "TestName",
          editingAuthorId: 1,
        },
      },
    });
  });

  it("Checks delete button", () => {
    const wrapper = mount(DeleteAuthor, { store, localVue });
    wrapper.find("form").trigger("submit.prevent");
    expect(actions.deleteAuthor).toHaveBeenCalledOnce()
  });

});
