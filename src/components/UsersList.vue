<template>
    <div v-if="userList">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in userList" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        {{ user.firstName + " " + user.middleName + " " + user.lastName }}
                    </td>
                    <td>{{ user.userName }}</td>
                    <td>{{ user.email }}</td>
                    <td><button type="button" class="btn btn-link" v-on:click="userDetail(user.id)">Details</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>Loading users list...</div>
</template>
<script setup>
import router from '@/router';
import getUserList from '../services/fetchUsers';
import { onBeforeMount, onMounted, ref } from 'vue';
import authenticated from '../helpers/authenticated';

const userList = ref([]);
const errors = ref(null);

const userData = getUserList();
const userLogin = authenticated.isAthenticated();

onBeforeMount(() => {
    if (!userLogin) {
        router.push({ name: "login-route" });
    }
})

onMounted(async () => {

    await userData.fetchUsers();

    userList.value = userData.users.value;
    errors.value = userData.error.value;

})

const userDetail = (id) => {
    router.push({ name: "userDetail-route", params: { id: id } });
}


</script>