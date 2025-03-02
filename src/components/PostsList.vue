<template>
    <div v-if="postList">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Author</th>
                    <th scope="col">Title</th>
                    <th scope="col">Creator</th>
                    <th scope="col">Quote</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in postList" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        {{ item.author }}
                    </td>
                    <td>{{ item.subject }}</td>
                    <td>{{ item.creator }}</td>
                    <td>{{ item.content.substr(0, 30) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>Loading posts list...</div>
</template>
<script setup>
import getPostList from '../services/fetchPosts';
import { onMounted, ref } from 'vue';

const postList = ref([]);
const errors = ref(null);

const postData = getPostList();

onMounted(async () => {

    await postData.fetchPosts();

    postList.value = postData.posts.value;
    errors.value = postData.error.value;

})

</script>