const state = {
  notificationsList: [],
};

const getters = {
  getNotifications: (state) => state.notificationsList,
};

const mutations = {
  PUSH_NOTIFICATION: (state, notification) => {
    notification.id = Math.random() + new Date();
    state.notificationsList.push(notification);
  },

  REMOVE_NOTIFICATION: (state) => {
    if (state.notificationsList.length) {
      state.notificationsList.shift();
    }
  },

  REMOVE_NOTIFICATION_BY_ID: (state, id) => {
    const index = state.notificationsList.findIndex((item) => item.id == id);
    if (index > -1) {
      state.notificationsList.splice(index, 1);
    }
  },
};

export default {
  state,
  getters,
  mutations,
};
