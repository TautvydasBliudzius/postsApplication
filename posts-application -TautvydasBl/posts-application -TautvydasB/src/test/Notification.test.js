import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Vuex from "vuex";
import Notification from "../components/Notification/Notification.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Notification.vue", () => {

    let store;
    let state;
    let mutations;
  
    beforeEach(() => {
      state = {
        notificationsList: [],
      };
      mutations = {
        REMOVE_NOTIFICATION: vi.fn().mockImplementation((state) => {
            if (state.notificationsList.length) {
              state.notificationsList.shift();
            }
          },),
          PUSH_NOTIFICATION: vi.fn().mockImplementation((state, notification) => {
            notification.id = Math.random() + new Date();
            state.notificationsList.push(notification);
          })
      };
  
      store = new Vuex.Store({
        modules: {
          NotStore: {
            state,
            mutations,
          },
        },
      });
    });

  it("Check notification message",  () => {
    const wrapper = mount(Notification, {
      propsData: {
        notification: {
          type: Object,
          required: true,
          message: "test",
        },
      },
    });

    const testNotMessage = "test";

    expect(wrapper.exists()).toBe(true);
    const notMessage = wrapper.find(".text").exists();
    expect(notMessage).toBe(true);
    expect(wrapper.text()).toContain(testNotMessage);
  });

  it("Check notification type", () => {
    const wrapper = mount(Notification, {
      propsData: {
        notification: {
          type: "test",
          required: true,
        },
      },
    });

    const testNotType = "test";

    expect(wrapper.exists()).toBe(true);
    const notType = wrapper.find(`.${testNotType}`).exists();
    expect(notType).toBe(true);
    expect(wrapper.vm.notification.type).toBe(testNotType);
  });

  it("Check notification removal button", async () => {
    const testNot = {
        message: "test",
        type: "error"
    }
    const wrapper = mount(Notification, {
        propsData: {
          notification: {
            type: "test",
            required: true,
          },
        },
      });
      mutations.PUSH_NOTIFICATION(state, testNot);
      expect(state.notificationsList.length).toBe(1)
      await wrapper.find('.close').trigger("click")
      await localVue.nextTick()
      mutations.REMOVE_NOTIFICATION(state)
      expect(state.notificationsList.length).toBe(0)
      expect(mutations.REMOVE_NOTIFICATION).toBeCalledTimes(1)
  });
});
