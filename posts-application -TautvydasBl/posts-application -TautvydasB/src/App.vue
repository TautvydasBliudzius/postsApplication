<template>
  <div id="app">
    <NavBar />
    <Modal
      :modal="$store.state.ModalMod.modal"
      :author="author"
      @close="CLOSE_MODAL()"
    />
    <router-view></router-view>
    <NotificationList />    
  </div>
</template>

<script>
import NavBar from "./views/NavBar.vue";
import NotificationList from "./components/Notification/NotificationList.vue";
import Modal from "./components/Modal.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    NavBar,
    NotificationList,
    Modal,
  },
  props: {
    author: Object,
  },
  methods: {
    ...mapMutations([`CLOSE_MODAL`]),
  },
};
</script>

<style>
#app {
  position: relative;
  height: 100%;
}
</style>
