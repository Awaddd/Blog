<template>
  <div class="">
    <section class="welcome-content is-fullheight">
      <img class="welcome-content-image is-hidden-mobile" src="../assets/Flat-Mountains.svg" width="100%">
      <!-- Got this svg background from https://www.svgbackgrounds.com/#flat-mountains -->

      <!-- <span class="welcome-content-shade is-hidden-mobile"></span> -->
      <div class="hero-body my-login-hero">
        
        <div class="container">

          <section class="my-form-wrapper container">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form class="my-form container" @keyup.enter.prevent="handleSubmit(login)">

              <p class="title is-size-4 has-text-primary has-text-centered"><strong>Login</strong></p>

              <BInputWithValidation vid="email" rules="required|email" type="email" icon="email" placeholder="John.smith@mail.com" label="Email" v-model="email"/>

              <BInputWithValidation vid="password" rules="required" type="password" icon="lock" label="Password"v-model="password" password-reveal/>

              <b-field>
                <b-button type="submit" class="is-primary my-login-button" expanded @click="handleSubmit(login)">Login</b-button>
              </b-field>

              <p class="has-text-dark my-subtext">Don't have an account? <router-link to="/admin/register" class="btn-clear">Register here</router-link></p>
            </form>
            </ValidationObserver>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import bcrypt from "bcryptjs";  
import { ValidationObserver } from 'vee-validate';
import * as validationRules from '@/helpers/validation';
import BInputWithValidation from '@/buefyComponents/BInputWithValidation';

export default {
    data() {
        return {
          email: null,
          password: null
        }
    },
    components: {
      ValidationObserver,
      BInputWithValidation
    },
    methods: {

      async login() {

        const response = await AuthService.login({
          email: this.email,
          password: this.password
        });

        if (response.status !== 200) {
          
          if (response.data.field.toLowerCase() === 'email') {
            this.$refs.form.setErrors({
              email: response.data.message
            });
          } else if (response.data.field.toLowerCase() === 'password'){
            this.$refs.form.setErrors({
              password: response.data.message
            });
          }

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

.my-login-hero {
  display: grid;
  align-content: start;
  align-items: start;
}

.my-form-wrapper {
  background: #fff;
  padding: 1rem;
  }

  .my-form, .confirmPassword {
    display: grid;
    grid-gap: 15px;
  }

  .my-login-button {
    margin-top: 15px;
  }

@media only screen and (min-width: 600px) {
  .my-form-wrapper {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    box-sizing: border-box;
    min-width: 200px;
    max-width: 500px;
    border-radius: 5px;
    color: #333;
    padding: 3rem 3rem 5rem 3rem;
  }
}
    
</style>