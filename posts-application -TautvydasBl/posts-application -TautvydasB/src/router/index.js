import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Authors from "../views/Authors.vue";
import Posts from "../views/Posts.vue";
import SinglePost from "../views/SinglePost.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(Router);

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/authors",
    name: "Authors",
    component: Authors,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    name: "SinglePost",
    component: SinglePost,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];
