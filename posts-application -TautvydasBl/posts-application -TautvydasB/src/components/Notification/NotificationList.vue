<template>
  <div class="notification__container">
    <Notification
      v-for="(notification, index) of getNotifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Notification from "./Notification.vue";

export default {
  name: "NotificationContainer",
  components: {
    Notification,
  },
  data() {
    return {
      intervalTimer: null,
    };
  },
  computed: {
    ...mapGetters(["getNotifications"]),
  },
  methods: {
    ...mapMutations(["REMOVE_NOTIFICATION"]),
  },
  watch: {
    getNotifications: {
      immediate: true,
      handler: function (getNotifications) {
        if (getNotifications.length && this.intervalTimer == null) {
          this.intervalTimer = setInterval(() => {
            this.REMOVE_NOTIFICATION();
          }, 2000);
        } else if (!getNotifications.length && this.intervalTimer != null) {
          clearInterval(this.intervalTimer);
          this.intervalTimer = null;
        }
      },
    },
  },
};
</script>

<style scoped>
.notification__container {
  position: fixed;
  top: 15%;
  right: 2%;
  width: 20%;
  z-index: 999;
}
</style>
