<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h3>Sign up</h3>
                <!-- -->
                <form @submit.prevent.stop="signUp">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter Name</label>
                        <input v-model="form.userName" type="email" @blur="validateUsername" class="form-control" />
                        <div class="alert alert-danger" role="alert" v-if="errorsMsg.userName">
                            {{ errorsMsg.userName }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Enter Email</label>
                        <input v-model="form.email" type="text" @blur="validateEmail" class="form-control" />
                        <div class="alert alert-danger" role="alert" v-if="errorsMsg.email">
                            {{ errorsMsg.email }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Enter Password</label>
                        <input v-model="form.password" type="password" @blur="validatePassword" class="form-control" />
                        <div class="alert alert-danger" role="alert" v-if="errorsMsg.password">
                            {{ errorsMsg.password }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit" v-on:mousedown="signUp" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="col-6">
                            <button type="submit" class="btn btn-secondary" v-on:click="cancelAction">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref } from "vue";
import FieldValidating from '../helpers/validatingField';
import router from "../router";

export default {
    setup() {
        const form = reactive({ userName: "", email: "", password: "" });
        const errorsMsg = ref([]);

        const signUp = async () => {
            if (await isValid()) {
                let signUpUser = {
                    userName: form.userName,
                    email: form.email,
                    password: form.password
                }
                let signUpResult = await axios.post("http://localhost:3000/users", signUpUser);
                if (signUpResult.status == 201) {
                    alert("Sign Up has been successfully!");
                    router.push({ name: 'home-route' });
                    //reload page to get updates
                    router.go(0);
                }
            }
            else {
                alert("Invalid input information! Please check!");
            }
        };

        //Validating username
        const validateUsername = () => {
            errorsMsg.value.userName = "";
            let result = false;
            if (FieldValidating.isNullOrEmtpy(form.userName)) {
                errorsMsg.value.userName = "Username is required!";
            }
            else if (!FieldValidating.isValidUserName(form.userName)) {
                errorsMsg.value.userName = "Username must contain alphanumeric and greater than 6 letters!";
            }
            else {
                result = true;
            }
            return result;
        };

        //Validating password
        const validatePassword = () => {
            errorsMsg.value.password = "";
            let result = false;
            if (FieldValidating.isNullOrEmtpy(form.password)) {
                errorsMsg.value.password = "Password is required!";
            }
            else if (!FieldValidating.isValidUserName(form.password)) {
                errorsMsg.value.password = "Password must contain alphanumeric and greater than 6 letters!";
            }
            else {
                result = true;
            }
            return result;
        };

        // Validating
        const validateEmail = () => {
            errorsMsg.value.email = "";
            let result = false;
            if (FieldValidating.isNullOrEmtpy(form.email)) {
                errorsMsg.value.email = "Email address is required!";
            }
            else if (!FieldValidating.isValidEmail(form.email)) {
                errorsMsg.value.email = "Email address is invalid!!";
            }
            else {
                result = true;
            }
            return result;
        };

        //Check all fields
        let isValid = () => {
            let result = false;
            if (validateUsername() && validateEmail() && validatePassword()) {
                result = true;
            }
            return result;
        };

        //cancel button
        const cancelAction = () => {
            router.push({ name: "home-route" });
        }

        return { signUp, form, errorsMsg, validateUsername, validateEmail, validatePassword, cancelAction };
    },
};
</script>
