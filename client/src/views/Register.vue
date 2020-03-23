<template>
  <div class="access my-container center">
    <form class="access-form">
      <h1 class="title">Register</h1>

      <p>Don't have an account? Register here</p>

      <div>
        <input type="text" name="email" placeholder="Email" v-model="email">
      </div>

      <div>
        <input type="text" name="firstName" placeholder="First Name" v-model="firstName">
      </div>

      <div>
        <input type="text" name="lastName" placeholder="Last Name" v-model="lastName">
      </div>

      <div>
        <input type="password" name="password" placeholder="Password" v-model="password">
      </div>

      <div>
        <input type="password" name="cPassword" placeholder="Confirm Password" v-model="cPassword">
      </div>

      <div>
        <button class="button is-primary" @click.prevent="register">Register</button>
      </div>

      <span v-if="errmsg">{{errmsg}}</span>
      
      <p>Have an account? <router-link to="/admin/login" class="btn-clear">Login</router-link> </p>

    </form>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import bcrypt from "bcryptjs";  

export default {
  data() {
    return {
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        cPassword: null,
        errmsg: null
      }
  },
  methods: {
      async register() {

        if (this.password === this.cPassword){
          this.errmsg = null; 

          await AuthService.register({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password
          })

          this.$router.push({ name: "Dashboard" });

        } else {
          this.errmsg = 'Passwords do not match.';
        }
        
      }
    
  }
}

</script>


<style lang="scss">
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
  grid-gap: 20px;

  div input,
  div textarea,
  div button {
    width: 100%;
  }
  h2 {
    margin: 0;
  }
}
    
</style>