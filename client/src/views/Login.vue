<template>
  <div class="access my-container center">
    <form class="access-form">
      <h1 class="title">Login</h1>
      <p>Have an account? Log in below</p>

      <div>
        <input type="text" name="email" placeholder="email" v-model="email">
      </div>

      <div>
        <input type="password" name="password" placeholder="Password" v-model="password">
      </div>

      <div>
        <button class="button is-primary" @click.prevent="login">Login</button>
      </div>
      
      <p>Don't have an account? <router-link to="/admin/register" class="btn-clear">Register</router-link> </p>
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
          password: null
        }
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