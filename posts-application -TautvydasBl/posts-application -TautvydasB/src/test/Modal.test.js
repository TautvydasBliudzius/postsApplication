import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Modal from "../components/Modal.vue";
import { describe, it, expect, beforeEach } from "vitest";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Modal component", () => {
  let store;
  let state;
  let mutations;
  const payload = {
    type: "ModalType",
  };

  beforeEach(() => {
    state = {
      modal: {
        showModal: false,
        modalType: "",
      },
    };
    mutations = {
      OPEN_MODAL: vi.fn().mockImplementation((state) => {
        state.modal.showModal = !state.modal.showModal;
      }),
      CLOSE_MODAL: vi.fn().mockImplementation((state) => {
        state.modal.showModal = !state.modal.showModal;
      }),
    };

    store = new Vuex.Store({
      modules: {
        ModalStore: {
          state,
          mutations,
        },
      },
    });
  });

  it("Opens modal window", () => {
    mutations.OPEN_MODAL(state, payload);
    expect(state.modal.showModal).toBe(true);
  });

  it("Closes modal window", async () => {
    const wrapper = shallowMount(Modal, {
      store,
      localVue,
      propsData: { modal: { showModal: Boolean, modalType: "someType" } },
    });
    mutations.OPEN_MODAL(state, payload);
    await wrapper.find(".closeBtn").trigger("click");
    await localVue.nextTick();
    mutations.CLOSE_MODAL(state);
    expect(mutations.CLOSE_MODAL).toBeCalledTimes(1);
    expect(state.modal.showModal).toBe(false);
  });

  it("Selects correct modal type", async () => {
    const testModalType = "someType"
    const wrapper = shallowMount(Modal, {
        store,
        localVue,
        propsData: { modal: { showModal: Boolean, modalType: "someType" } },
      });
    expect(wrapper.vm.modal.modalType).toBe(testModalType)
  });


});
