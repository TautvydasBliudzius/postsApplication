import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Vuex from "vuex";
import NotificationList from "../components/Notification/NotificationList.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Notification.vue", () => {
  let store;
  let state;
  let mutations;
  let getters;

  beforeEach(() => {
    state = {
      notificationsList: [],
    };
    mutations = {
      REMOVE_NOTIFICATION: vi.fn().mockImplementation((state) => {
        if (state.notificationsList.length) {
          state.notificationsList.shift();
        }
      }),
      PUSH_NOTIFICATION: vi.fn().mockImplementation((state, notification) => {
        notification.id = Math.random() + new Date();
        state.notificationsList.push(notification);
      }),
    };

    getters = {
      getNotifications: (state) => state.notificationsList,
    };

    store = new Vuex.Store({
      modules: {
        NotStore: {
          state,
          mutations,
          getters,
        },
      },
    });
  });

  it("Check getNotifications", () => {
    const testNot1 = {
      message: "test1",
      type: "error",
    };
    const testNot2 = {
      message: "test2",
      type: "success",
    };
    const testNot3 = {
      message: "test3",
      type: "error",
    };

    const wrapper = mount(NotificationList, { store, localVue });

    mutations.PUSH_NOTIFICATION(state, testNot1);
    mutations.PUSH_NOTIFICATION(state, testNot2);
    mutations.PUSH_NOTIFICATION(state, testNot3);

    const computedNotifications = wrapper.vm.getNotifications.length;
    const testNotifications = state.notificationsList.length;
    expect(computedNotifications).toEqual(testNotifications);
  });
});
