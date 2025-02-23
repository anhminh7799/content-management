<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <h3>Sign up</h3>
        <!-- -->
        <form @submit.prevent.stop="signUp">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Enter Name</label
            >
            <input
              v-model="form.userName"
              type="email"
              @blur="validateUsername"
              class="form-control"
            />
            <div
              class="alert alert-danger"
              role="alert"
              v-if="errorsMsg.userName"
            >
              {{ errorsMsg.userName }}
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Enter Email</label
            >
            <input v-model="form.email" type="text" class="form-control" />
            <div class="alert alert-danger" role="alert" v-if="errorsMsg.email">
              {{ errorsMsg.email }}
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Enter Password</label
            >
            <input
              v-model="form.password"
              type="password"
              class="form-control"
            />
            <div
              class="alert alert-danger"
              role="alert"
              v-if="errorsMsg.password"
            >
              {{ errorsMsg.password }}
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
            <div class="col-6">
              <button type="submit" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import { reactive, ref } from "vue";

export default {
  setup() {
    const form = reactive({ userName: "", email: "", password: "" });
    const errorsMsg = ref([]);

    const signUp = async () => {
      //   await validate();
      // if (!validate) {
      //     let signUpUser = {
      //         userName: form.userName,
      //         email: form.email,
      //         password: form.password
      //     }
      //console.log(errorsMsg);
      //     let signUpResult = await axios.post("http://localhost:3000/users", signUpUser);
      //     console.log(signUpResult);
      // }
    };

    // let validate = watch(() => {
    //   //Validate information
    //   let errors = {};

    //   if (!form.userName || form.userName == "") {
    //     errors.userName = "Username is required!";
    //   }

    //   if (!form.email || form.email == "") {
    //     errors.email = "Email is required!";
    //   }

    //   if (!form.password || form.password == "") {
    //     errors.password = "Password is required!";
    //   }

    //   errorsMsg.value = errors;
    //   return Object.keys(errors).length === 0;
    // });

    const isValid = () => {};

    const validateUsername = () => {
      errorsMsg.value.userName = "";
      if (!form.userName || form.userName == "") {
        errorsMsg.value.userName = "Username is required!";
      }
    };
    // validateUsername();
    return { signUp, form, errorsMsg, validateUsername };
  },
};
</script>
