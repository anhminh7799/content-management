<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand"
        >Content Management.
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <li
            class="nav-item"
            v-for="button in listBtns"
            :key="button.name"
            v-bind:class="button.isActive"
          >
            <a class="nav-link" type="button" aria-current="page">
              {{ button.name }}</a
            >
          </li>
        </ul>

        <ul class="nav justify-content-end">
          <li class="nav-item">
            <button class="btn btn-outline-success" v-on:click="signUp">
              Sign Up
            </button>
          </li>
          <li class="nav-item">
            <button class="btn btn-success ms-2" v-on:click="logIn">
              Log In
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import router from "../router";

export default {
  setup() {
    const listBtns = ref([
      {
        name: "Home",
        isActive: false,
      },
      {
        name: "Users",
        isActive: false,
        //action: homePage()
      },
      {
        name: "About",
        isActive: false,
        //action: homePage()
      },
    ]);

    const homePage = () => {
      router.push({ name: "home-route" });
    };
    const signUp = () => {
      router.push({ name: "signUp-route" });
    };

    const logIn = () => {
      router.push({ name: "login-route" });
    };

    return { signUp, logIn, homePage, listBtns };
  },
};
</script>
