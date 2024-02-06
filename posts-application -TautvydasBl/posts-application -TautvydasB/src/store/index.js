import Vue from "vue";
import Vuex from "vuex";
import NotificationsMod from "./modules/NotificationsMod";
import AuthorsMod from "./modules/AuthorsMod";
import apiPlugin from "./plugins/apiPlugin";
import ModalMod from "./modules/ModalMod";
import PostsMod from "./modules/PostsMod";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    NotificationsMod,
    AuthorsMod,
    ModalMod,
    PostsMod
  },
  plugins: [apiPlugin],
});
