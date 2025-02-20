/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import SignUp from "./views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "home-route",
    component: HomePage,
  },
  {
    path: "/signup",
    name: "signUp-route",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
