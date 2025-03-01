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
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>Loading users list...</div>
</template>
<script setup>
import getUserList from '../services/fetchUsers';
import { onMounted, ref } from 'vue';

const userList = ref([]);
const errors = ref(null);

const userData = getUserList();

onMounted(async () => {

    await userData.fetchUsers();

    userList.value = userData.users.value;
    errors.value = userData.error.value;

})

</script>