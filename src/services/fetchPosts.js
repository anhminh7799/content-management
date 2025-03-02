import axios from "axios";
import { ref } from "vue";

export default function () {
  let posts = ref([]);
  let error = ref(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");

      if (response.status == 200) {
        posts.value = response.data;
      } else {
        throw new Error("Something went wrong!!!");
      }
    } catch (err) {
      error.value = err;
    }
  };

  return { posts, error, fetchPosts };
}
