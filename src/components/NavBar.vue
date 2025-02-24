<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{ name: 'home-route' }">Content Management</router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="navbar-brand" :to="{ name: 'home-route' }">Users</router-link>
                    </li>
                </ul>
                <ul class="nav justify-content-end">
                    <li class="nav-item">
                        <button class="btn btn-outline-success" v-on:click="signUp">
                            Sign Up</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-success" v-on:click="logIn">
                            Log In</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import router from "../router";

export default {
    setup() {
        const signUp = () => {
            router.push({ name: 'signUp-route' });
        }

        const logIn = () => {
            router.push({ name: 'login-route' });
        }

        return { signUp, logIn }
    }
}
</script>
