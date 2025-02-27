<template>
  <Login />
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" v-on:click="homePage">Content Management.
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="item in listNavItems" :key="item.name" v-on:click="itemAction(item.name)">
            <a class="nav-link" type="button" aria-current="page" v-bind:class="{ active: item.isActive }">
              {{ item.name }}</a>
          </li>
        </ul>

        <ul class="nav justify-content-end">
          <li class="nav-item">
            <button class="btn btn-outline-success" v-on:click="signUp">
              Sign Up
            </button>
          </li>
          <li class="nav-item">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#logInModal">
              Log In
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { reactive } from "vue";
import router from "../router";
import LoginModal from "./LoginModal.vue";

export default {
  components: {
    Login: LoginModal
  },
  setup() {
    const listNavItems = reactive([
      {
        name: "Home",
        isActive: true,
        route: "home-route",
      },
      {
        name: "Users",
        isActive: false,
        route: "users-route",
      },
      {
        name: "About",
        isActive: false,
        route: "about-route",
      },
    ]);

    //For the routing and highlighting the choosen button
    const itemAction = (name) => {
      listNavItems.forEach((item) => {
        if (item.name === name) {
          item.isActive = !item.isActive;
          router.push({ name: item.route })
        }
        else {
          item.isActive = false;
        }
        return false;
      })
    }

    const homePage = () => {
      router.push({ name: "home-route" });
    };
    const signUp = () => {
      router.push({ name: "signUp-route" });
    };

    const logIn = () => {
      router.push({ name: "login-route" });
    };

    return { signUp, logIn, homePage, listNavItems, itemAction };
  },


};
</script>
