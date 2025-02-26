<template>
    <div>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <h3>Log in</h3>
                    <!-- -->
                    <form @submit.prevent.stop="logIn">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter Name</label>
                            <input v-model="form.userName" type="email" @blur="validateUsername" class="form-control" />
                            <div class="alert alert-danger" role="alert" v-if="errorsMsg.userName">
                                {{ errorsMsg.userName }}
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
                                <button type="submit" v-on:mousedown="logIn" class="btn btn-primary">Submit</button>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';
import { reactive, ref } from "vue";
import FieldValidating from '../helpers/validatingField';
import axios from "axios";
import router from "../router";

export default {
    setup() {
        const form = reactive({ userName: "", password: "" });
        const errorsMsg = ref([]);
        let userData = ref([]);

        //Login processing
        const logIn = async () => {
            let logInUser = await axios.get("http://localhost:3000/users");

            if (logInUser.status == 200 && logInUser.data.length > 0) {
                //assign data get from api to a variable
                userData.value = logInUser.data;

                //filter
                userData.value = userData.value.filter(item => item.userName == form.userName && item.password == form.password);
                if (userData.value.length > 0) {
                    localStorage.setItem("userLogin", JSON.stringify(userData.value));
                    router.push({ name: "home-route" });
                }
                else {
                    alert("Login failed!");
                }
            }
        }

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

        return { validatePassword, validateUsername, form, errorsMsg, logIn }
    }
}
</script>