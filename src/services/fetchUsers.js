import axios from "axios";
import { ref } from "vue";

export default function () {
  let users = ref([]);
  let error = ref(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");

      if (response.status == 200) {
        users.value = response.data;
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (err) {
      error.value = err;
    }
  };

  return { users, error, fetchUsers };
}
