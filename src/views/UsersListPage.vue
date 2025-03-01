<template>
    <div>
        <div class="container">
            <UserList />
        </div>
    </div>
</template>

<script>
import UserList from "../components/UsersList.vue"

export default {
    components: {
        UserList: UserList
    }
}
</script>