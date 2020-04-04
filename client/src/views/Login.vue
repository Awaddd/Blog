<template>
  <div class="access my-container">

    <form class="access-form">

      <div class="my-form-header-wr">
        <h1 class="title is-3 is-size-4-mobile">Login</h1>
      </div>

      <div class="my-form-wrapper">

        <ValidationProvider name="Email" v-slot="v" rules="required|email">
          <b-input placeholder="Email" type="text" icon="email" v-model="email"></b-input>
          <p class="has-text-danger">{{v.errors[0]}}</p>
        </ValidationProvider>
          
        <ValidationProvider name="Password" v-slot="v" rules="required">
          <!-- <b-input type="password" v-model="password" placeholder="Password" password-reveal></b-input> -->
          <b-input type="password" v-model="password" icon="lock" placeholder="Password" password-reveal></b-input>
          <p class="has-text-danger">{{v.errors[0]}}</p>
        </ValidationProvider>


        <b-button type="is-primary" @click.prevent="login">Login</b-button>

        <p class="has-text-dark my-subtext">Don't have an account? <router-link to="/admin/register" class="btn-clear">Register here</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import bcrypt from "bcryptjs";  
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as validationRules from '@/helpers/validation';

export default {
    data() {
        return {
          email: null,
          password: null
        }
    },
    components: {
      ValidationProvider,
      ValidationObserver
    },
    methods: {

      async login() {

        const response = await AuthService.login({
          email: this.email,
          password: this.password
        });

        if (response.status !== 200) {

          console.log('ERROR: ', response.data);
          console.log(response.data);

        } else if (response.status === 200 && response.data.user){

          const user = response.data.user;
          localStorage.setItem('user', user);

          console.log(response.data.message);

          this.$store.dispatch("SET_LOGIN_STATUS", localStorage.getItem('user'));
          this.$router.push({ name: "Dashboard" });
        }
      }
   }
}
</script>

<style lang="scss" scoped>
@import "../styles/app.scss";

.access {
  background: #ffffff;
  padding: 2rem;
}

.access-form {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-gap: 35px;

  div input,
  div textarea,
  div button {
    width: 100%;
  }
  h2 {
    margin: 0;
  }

  min-width: 200px;
  max-width: 800px;

}

.my-form-wrapper {
  display: grid;
  grid-gap: 25px;
}

.confirmPassword {
  display: grid;
  grid-gap: 25px;
}

@media only screen and (min-width: 600px) {
  .access-form{
    padding: 5rem 0;
  }
}
    
</style>