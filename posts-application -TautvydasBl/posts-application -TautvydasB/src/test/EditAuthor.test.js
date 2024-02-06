import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import EditAuthor from "../components/Forms/EditAuthor.vue";
import { describe, it, expect } from "vitest";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);

describe("EditAuthor.vue", () => {

    let actions;
    let store;
  
    beforeEach(() => {
      actions = {
        updateAuthor: vi.fn(),
      };
  
      store = new Vuex.Store({
        actions,
        state: {
          AuthorsMod: {
            editingAuthorName: "TestName"
          },
        },
      });
    });



  it("Check if input works correctly", () => {
    const wrapper = shallowMount(EditAuthor, {store, localVue});
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });

  it("Check forms input text", async () => {
    const wrapper = mount(EditAuthor, {store, localVue});
    const input = wrapper.find('input');
    await input.setValue('TestInput');
    
    const inputValue = wrapper.vm.newAuthorName;
    expect(inputValue).toBe('TestInput')
  });

  it("Checks submit button", () => {
    const wrapper = mount(EditAuthor, {store, localVue});
    wrapper.find("form").trigger("submit.prevent");
    expect(actions.updateAuthor).toHaveBeenCalledOnce()
  });
});
