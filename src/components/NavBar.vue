<template>
  <Login />
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" v-on:click="homePage" href="">Content Management.
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="item in listItem" :key="item.name" v-on:click="itemAction(item.name)">
            <a class="nav-link" type="button" aria-current="page" v-bind:class="{ active: item.isActive }">
              {{ item.name }}</a>
          </li>
        </ul>

        <ul class="nav justify-content-end">
          <li class="nav-item">
            <button class="btn btn-outline-success" v-on:click="signUp" v-if="!userName">
              Sign Up
            </button>
          </li>
          <li class="nav-item" v-if="!userName">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#logInModal">
              Log In
            </button>
          </li>
          <li class="nav-item" v-if="userName">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-success ms-2" v-on:click="userDetail(userId)">
              Hello - {{ userName }}
            </button>
          </li>
          <li class="nav-item" v-if="userName">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-success ms-2" v-on:click="logOut">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import router from "../router";
import LoginModal from "./LoginModal.vue";
import authenticated from '../helpers/authenticated';

export default {
  components: {
    Login: LoginModal
  },
  setup() {
    let listItem = ref([]);
    const userRole = ref("");
    const userId = ref("");
    const userName = ref("");

    const listNavItems = reactive([
      {
        name: "Home",
        isActive: true,
        route: "home-route",
        authen: "all"
      },
      {
        name: "Users",
        isActive: false,
        route: "users-route",
        authen: "Admin"
      },
      {
        name: "Posts",
        isActive: false,
        route: "posts-route",
        authen: "all"
      },
      {
        name: "About",
        isActive: false,
        route: "about-route",
        authen: "all"
      }
    ]);

    onMounted(() => {
      const isLogin = authenticated.isAthenticated();
      const getInfor = authenticated.getLoginInfor();
      const getRole = authenticated.getRole();

      if (isLogin && getInfor.length > 0) {
        userName.value = getInfor.userName;
        userId.value = getInfor.id;
        userRole.value = getRole;
      }
    })

    //Computed property to filter navigation items based on role
    listItem = computed(() => {
      return userRole.value.toUpperCase() === "ADMIN" ? listNavItems :
        listNavItems.filter(item => item.authen == "all");
    })

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

    const logOut = () => {
      localStorage.removeItem('userLogin');
      router.push({ name: "home-route" });
      router.go(0);
    }

    const userDetail = (id) => {
      router.push({ name: "userDetail-route", params: { id: id } });
    }

    return { signUp, logIn, homePage, listItem, itemAction, logOut, userDetail };
  },


};
</script>
