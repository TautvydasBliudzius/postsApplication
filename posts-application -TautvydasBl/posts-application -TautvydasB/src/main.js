import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Routes from "./router/index";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import "./style.css"
import { ValidationProvider,ValidationObserver } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  mode: "history",
  routes: Routes,
});

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");

