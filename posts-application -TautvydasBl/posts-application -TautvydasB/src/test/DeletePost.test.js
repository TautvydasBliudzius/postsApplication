import { mount, createLocalVue } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import DeletePost from "../components/Forms/DeletePost.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("DeletePost.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      deletePost: vi.fn(),
    };

    store = new Vuex.Store({
      actions,
      state: {
        PostsMod: {
          editingPostTitle: "TestTitle",
          editingPostId: 1,
        },
      },
    });
  });

  it("Checks delete button", () => {
    const wrapper = mount(DeletePost, { store, localVue });
    wrapper.find("form").trigger("submit.prevent");
    expect(actions.deletePost).toHaveBeenCalledOnce()
  });

});
