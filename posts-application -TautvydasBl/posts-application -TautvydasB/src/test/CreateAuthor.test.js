import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import CreateAuthor from "../components/Forms/CreateAuthor.vue";
import { describe, it, expect } from "vitest";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);

describe("CreateAuthor.vue", () => {

    let actions;
    let store;
  
    beforeEach(() => {
      actions = {
        createNewAuthor: vi.fn(),
      };
  
      store = new Vuex.Store({
        actions
      });
    });


  it("Check if input works correctly", () => {
    const wrapper = shallowMount(CreateAuthor);
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });

  it("Check forms input text", async () => {
    const wrapper = mount(CreateAuthor);
    const input = wrapper.find('input');
    await input.setValue('TestInput');
    
    const inputValue = wrapper.vm.authorName;
    expect(inputValue).toBe('TestInput')
  });

  it("Checks submit button", () => {
    const wrapper = mount(CreateAuthor, {store, localVue});
    wrapper.find("form").trigger("submit.prevent");
    expect(actions.createNewAuthor).toHaveBeenCalledOnce()
  });


});
