<template>
  <!-- Got this svg background from https://www.svgbackgrounds.com/#sun-tornado -->

  <div class="my-register">
    <div class="container">
      <section class="my-form-wrapper container">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="my-form container" @keyup.enter.prevent="handleSubmit(register)">
            <p class="title is-size-4 has-text-primary has-text-centered"><strong>Register</strong></p>
            <BInputWithValidation vid="email" rules="required|email" type="email" icon="email" placeholder="John.smith@mail.com" label="Email" v-model="email"/>
            <BInputWithValidation rules="required|min:2|max:30" type="text" icon="account" placeholder="John" label="First Name" v-model="firstName"/>
            <BInputWithValidation rules="required|min:2|max:30" type="text" icon="account-group" placeholder="Smith" label="Last Name" v-model="lastName"/>
            
            <ValidationObserver class="confirmPassword"> 

              <BInputWithValidation rules="required|min:7|max:30" type="password" icon="lock" label="Password" vid="confirmation" v-model="password" password-reveal/>
              <BInputWithValidation rules="required|min:7|max:30|confirmed:confirmation" type="password" icon="lock"  v-model="confirmPassword"  label="Confirm Password" password-reveal/>

            </validationObserver>

            <b-field>
              <b-button type="submit" class="is-primary my-register-button" expanded @click="handleSubmit(register)">Register</b-button>
            </b-field>
            <p class="has-text-dark has-text-centered">Got an account? <router-link to="/admin/login" class="btn-clear">Click here to Login</router-link></p>
            {{errorFeedback}}
          </form>
        </ValidationObserver>
      </section>        
    </div>
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
        firstName: null,
        lastName: null,
        password: null,
        confirmPassword: null,
        errorFeedback: null
      }
  },
  components: {
    ValidationObserver,
    BInputWithValidation
  },
  methods: {
      async register() {
        console.log(this.email, this.firstName, this.lastName, this.password, this.confirmPassword);

        if (this.password === this.confirmPassword){

          const response = await AuthService.register({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password
          })
          

          if (response.status !== 200) {

            if (response.data.field.toLowerCase() === 'email') {
              this.$refs.form.setErrors({
                email: response.data.message
              });
            }

            console.log('new post ERROR: ', response.data.message);

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
}

</script>


<style lang="scss" scoped>
@import "../styles/app.scss";

.my-register {
  padding: 1rem;
}

.my-form-wrapper {
  background: #fff;
  padding: 1rem;

}

.my-form, .confirmPassword {
  display: grid;
  grid-gap: 15px;
}

.my-register-button {
  margin-top: 15px;
}


@media only screen and (min-width: 700px) {

  .my-register {
    padding: 0;
    // overflow: hidden;
    // position: relative;
    background-color: #ff7700;
    background-image: url("../assets/Sun-Tornado.svg");
    background-attachment: fixed;
    background-size: cover;
    min-height: 100%;
  }

  .my-form-wrapper {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 500px;
    border-radius: 5px;
    color: #333;
    padding: 3rem 3rem 5rem 3rem;
    margin-top: 100px;
    margin-bottom: 100px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
}
    
</style>