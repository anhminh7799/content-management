/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import SignUp from "./views/SignUp.vue";
import LogIn from "./views/LogIn.vue";
import AboutPage from "./views/AboutPage.vue";
import UsersListPage from "./views/UsersListPage.vue";

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
  {
    path: "/login",
    name: "login-route",
    component: LogIn,
  },
  {
    path: "/about",
    name: "about-route",
    component: AboutPage,
  },
  {
    path: "/users",
    name: "users-route",
    component: UsersListPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
