<template>
  <div class="access my-container">

    <form class="access-form">

      <div class="">
        <h1 class="title is-3 is-size-4-mobile">Register</h1>
        <h3 class="subtitle is-5 is-size-6-mobile" >Don't have an account? Register below</h3>
      </div>

      <div class="my-form-wrapper">

        <BInputWithValidation rules="required|email" type="email" icon="email" placeholder="Email" name="Email" v-model="email"/>
        <BInputWithValidation rules="required|min:2|max:30" type="text" icon="account" placeholder="First Name" name="First Name" v-model="firstName"/>
        <BInputWithValidation rules="required|min:2|max:30" type="text" icon="account-group" placeholder="Last Name" name="Last Name" v-model="lastName"/>
        
        <ValidationObserver class="confirmPassword"> 

        <BInputWithValidation rules="required|min:7|max:30" type="password" icon="lock" placeholder="Password" name="Password" vid="confirmation" v-model="password" password-reveal/>
        <BInputWithValidation rules="required|min:7|max:30|confirmed:confirmation" type="password" icon="lock" placeholder="Confirm Password" v-model="confirmPassword"  name="Confirm Password" password-reveal/>

        </validationObserver>

        <b-button type="is-primary" @click.prevent="register">Register</b-button>

        <p class="has-text-dark my-subtext">Got an account? <router-link to="/admin/login" class="btn-clear">Click here to Login</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import bcrypt from "bcryptjs";  
import { ValidationProvider, ValidationObserver } from 'vee-validate';
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
      }
  },
  components: {
    ValidationProvider,
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
            console.log('new post ERROR: ', response.data.message);
            this.errmsg = response.data.message;
          } else if (response.status === 200){
            console.log(response.data.message);
            this.$router.push({ name: "Dashboard" });
          }

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