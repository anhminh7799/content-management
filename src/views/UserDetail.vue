<template>
    <div>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <h1>Update User Information</h1>
                    <!-- @submit.prevent.stop="updateUser"-->
                    <form @submit.prevent.stop="updateUser">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter Name</label>
                            <input v-model="form.userName" type="email" @blur="validateUsername" class="form-control"
                                disabled />
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
                            <input v-model="form.password" type="password" @blur="validatePassword"
                                class="form-control" />
                            <div class="alert alert-danger" role="alert" v-if="errorsMsg.password">
                                {{ errorsMsg.password }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button type="submit" v-on:mousedown="updateUser"
                                    class="btn btn-primary">Submit</button>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-secondary"
                                    v-on:click="cancelAction">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, ref } from "vue";
import FieldValidating from '../helpers/validatingField';
import router from "../router";
import { useRoute } from "vue-router";

export default {

    setup() {
        const route = useRoute();
        let form = reactive({ userName: "", email: "", password: "" });
        let oldPassword = ref('');
        const errorsMsg = ref([]);

        //Assign value from data to form
        onMounted(() => {
            let currentUser = JSON.parse(localStorage.getItem("userLogin"));

            if (currentUser) {
                if (currentUser.userName && currentUser.email && currentUser.password) {
                    form.userName = currentUser.userName;
                    form.password = currentUser.password;
                    oldPassword = currentUser.password;
                    form.email = currentUser.email;
                }
            }
        })

        const updateUser = async () => {
            if (await isValid()) {
                let updateUser = {
                    userName: form.userName,
                    email: form.email,
                    password: form.password
                }

                if (updateUser.password !== oldPassword.value) {
                    //Workflow for update user infor with change password included
                    let updateResult = await axios.put("http://localhost:3000/users/" + route.params.id, updateUser);
                    if (updateResult.status == 200) {
                        alert("User information has been updated successfully!");
                        router.push({ name: 'home-route' });
                        // log out user
                        localStorage.removeItem('userLogin');
                        //reload page to get updates
                        router.go(0);
                        alert("Since password has been udpated! Please login again!");
                    }
                } else {
                    let updateResult = await axios.put("http://localhost:3000/users/" + route.params.id, updateUser);
                    if (updateResult.status == 200) {
                        alert("User information has been updated successfully!");
                        router.push({ name: 'home-route' });
                        //reload page to get updates
                        router.go(0);
                    }
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

        // //cancel button
        const cancelAction = () => {
            router.push({ name: "home-route" });
        };


        return { form, errorsMsg, validateUsername, validateEmail, validatePassword, cancelAction, updateUser };
    },
};
</script>