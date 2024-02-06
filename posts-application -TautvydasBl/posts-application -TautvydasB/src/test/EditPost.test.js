import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditPost from "../components/Forms/EditPost.vue";
import { describe, it, expect } from 'vitest';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe("EditPost.vue", () => {

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
            editingPostContent: "TestContent",
            editingPostId: 1,
          },
        },
      });
    });

  it("Check if input works correctly", () => {
    const wrapper = shallowMount(EditPost, {store, localVue});
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
  });

  it("Check forms input text", async () => {
    const wrapper = shallowMount(EditPost, {store, localVue});
    const input = wrapper.find("input");
    await input.setValue(store.state.PostsMod.editingPostTitle);  
    const inputValue = wrapper.vm.newPostTitle;
    expect(inputValue).toBe(store.state.PostsMod.editingPostTitle);
  });

  it("Check forms textarea text", async () => {
    const wrapper = shallowMount(EditPost, {store, localVue});
    const input = wrapper.find("textarea");
    await input.setValue(store.state.PostsMod.editingPostContent);  
    const contentValue = wrapper.vm.newPostContent;
    expect(contentValue).toBe(store.state.PostsMod.editingPostContent);
  });  
});
