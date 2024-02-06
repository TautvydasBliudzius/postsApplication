<template>
  <div
    :class="notification.type"
    transition="slide-out-right"
    v-if="showNotification"
  >
    <div class="text">{{ notification.message }}</div>
    <button
      class="close"
      aria-label="Dismiss alert"
      type="button"
      @click="REMOVE_NOTIFICATION_BY_ID(notification.id)"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Notification",
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showNotification: true,
    };
  },
  methods: {
    ...mapMutations(["REMOVE_NOTIFICATION_BY_ID"]),
  },
};
</script>

<style scoped>
.success,.failed {
  color: white;
  display: inline-flex;
  width: 20rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem 1rem;
  border-radius: 1rem;
}

.success{
  background-color: rgb(87, 161, 87);
}

.failed {
  background-color: rgb(248, 80, 80);
}

.text {
  margin: auto;
  width: 80%;
}

.close {
  width: 32px;
  height: 32px;
  opacity: 0.5;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.close:hover {
  opacity: 1;
}
</style>
