import { mount, createLocalVue } from "@vue/test-utils";
import Pagination from "../components/Pagination.vue";
import { describe, it, expect } from "vitest";

const localVue = createLocalVue();

describe("Pagination.vue", () => {
  it("Check next page button", async () => {
    const wrapper = mount(Pagination, {
      localVue,
      propsData: {
        itemsPerPage: 5,
        total: 20,
        currentPage: 1,
      },
    });

    await wrapper.find(".nextPage").trigger("click");
    const emittedEvents = wrapper.emitted().pageChanged;
    expect(emittedEvents).toBeTruthy();
    const nextPageEvent = wrapper.vm.currentPage + 1;
    expect(emittedEvents[0][0]).toBe(nextPageEvent);
  });

  it("Check previous page button", async () => {
    const wrapper = mount(Pagination, {
      localVue,
      propsData: {
        itemsPerPage: 5,
        total: 20,
        currentPage: 2,
      },
    });

    await wrapper.find(".prevPage").trigger("click");
    const emittedEvents = wrapper.emitted().pageChanged;
    expect(emittedEvents).toBeTruthy();
    const prevPageEvent = wrapper.vm.currentPage - 1;
    expect(emittedEvents[0][0]).toBe(prevPageEvent);
  });
});
