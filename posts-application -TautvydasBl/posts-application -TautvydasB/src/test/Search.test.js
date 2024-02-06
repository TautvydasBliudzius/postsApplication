import { mount, createLocalVue } from "@vue/test-utils";
import Search from "../components/Search.vue";
import { describe, it, expect } from "vitest";
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Search.vue", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        getAuthors: () => [],
        getPosts: () => [],
      },
    });
  });

  it("Check input functionality", () => {
    const wrapper = mount(Search, {
      localVue,
      store,
      propsData: {
        searchItem: "Test"
      },
    });

    wrapper.vm.$emit('filterItems', 'Input Value');    
    expect(wrapper.emitted().filterItems[0]).toEqual(["Input Value"]);
    
  });
});
