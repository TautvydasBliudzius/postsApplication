import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import CreatePost from "../components/Forms/CreatePost.vue";
import { describe, it, expect } from "vitest";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);


describe("CreatePost.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      createNewPost: vi.fn(),
    };

    store = new Vuex.Store({
      actions
    });
  });

  it("Check if input works correctly", () => {
    const wrapper = shallowMount(CreatePost);
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
  });

  it("Check forms input text", async () => {
    const wrapper = shallowMount(CreatePost, {
      propsData: {
        isInputEmpty: false,
      },
    });
    const input = wrapper.find("input");
    await input.setValue("TestInput");
    const inputValue = wrapper.vm.postTitle;
    expect(inputValue).toBe("TestInput");
  });

  it("Check forms textarea text", async () => {
    const wrapper = shallowMount(CreatePost, {
      propsData: {
        isInputEmpty: false,
      },
    });
    const input = wrapper.find("textarea");
    await input.setValue("TestContent");
    const contentValue = wrapper.vm.postContent;
    expect(contentValue).toBe("TestContent");
  });

  it("Checks submit button", () => {
    const wrapper = mount(CreatePost, {
      store,
      localVue,
      propsData: {
        isInputEmpty: false,
      },
    });
    wrapper.find("form").trigger("submit.prevent");
    // expect(wrapper.)
    expect(actions.createNewPost).toHaveBeenCalledOnce()
  });
});
