import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import { describe, it, expect } from 'vitest';
import Vuex from 'vuex';
import Author from '../components/Authors/Author.vue';
import Pagination from '../components/Pagination.vue'; 

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Author.vue', () => {
  let store;
  let state;
  let getters;

  beforeEach(() => {
    state = {
      authors: [],
      editingAuthorId: null,
      editingAuthorName: null,
    };
    getters = {
      getAuthors: (state) => state.authors
    };

    store = new Vuex.Store({
      modules: {
        AuthorsMod: {
          state,
          getters,
        },
      },
    });
  });

  it('Check Author component with author information', async () => {
    const author = { id: 1, name: 'Test Name', created_at: '2024-01-01', updated_at: '2024-01-02' };
    const wrapper = mount(Author, {
      store,
      localVue,
      propsData: { author },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Author name: Test Name');
    expect(wrapper.text()).toContain('Updated: 2024-01-02');
    author.created_at = '2024-01-02'
    await localVue.nextTick();
    expect(wrapper.text()).toContain('Created: 2024-01-02');
    expect(wrapper.find('.updateButton').exists()).toBe(true);
    expect(wrapper.find('.deleteButton').exists()).toBe(true);
  });

  
  
});
