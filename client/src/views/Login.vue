<template>
  <div class="access container center">
    <form class="access-form">
      <h2 class>Login</h2>
      <p>Have an account? Log in below</p>

      <div>
        <input type="text" name="email" placeholder="email" v-model="email">
      </div>

      <div>
        <input type="password" name="password" placeholder="Password" v-model="password">
      </div>

      <div>
        <button class="btn small" @click.prevent="login">Login</button>
      </div>
      
      <p>Don't have an account? <span class="btn-clear">Register</span> </p>
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        console.log(hashedPassword);

        await AuthService.login({
          email: this.email,
          password: hashedPassword
        });



          // this.$router.push({ name: "Dashboard" });
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