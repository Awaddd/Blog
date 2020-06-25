<template>
  <!-- Got this svg background from https://www.svgbackgrounds.com/#sun-tornado -->

  <div class="my-register">
    <div class="container">
      <section class="my-form-wrapper container">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="my-form container" @keyup.enter.prevent="handleSubmit(register)">
            <p class="title is-size-4 has-text-centered">Register</p>

            <div class="my-form-input">
              <label for="Email">Email</label>
              <BInputWithValidation vid="email" rules="required|email" type="email" icon="email" placeholder="John.smith@mail.com" name="Email" v-model="email"/>
            </div>

            <div class="my-form-input">
              <label for="firstName">First Name</label>
              <BInputWithValidation rules="required|min:2|max:30" type="text" icon="account" placeholder="John" name="First name" v-model="firstName"/>
            </div>

            <div class="my-form-input">
              <label for="lastName">Last Name</label>
              <BInputWithValidation rules="required|min:2|max:30" type="text" icon="account-group" placeholder="Smith" name="Last name" v-model="lastName"/>
            </div>

            
            <ValidationObserver class="confirmPassword"> 
              <div class="my-form-input">
                <label for="password">Password</label>
                <BInputWithValidation rules="required|min:7|max:30" type="password" icon="lock" name="Password" vid="confirmation" v-model="password" password-reveal/>
              </div>

              <div class="my-form-input">
                <label for="confirmPassword">Confirm Password</label>
                <BInputWithValidation rules="required|min:7|max:30|confirmed:confirmation" type="password" icon="lock"  v-model="confirmPassword"  name="Confirm password" password-reveal/>
              </div>

            </validationObserver>

            <b-switch size="is-small" v-model="isAdmin">Enable Admin</b-switch>

            <b-field>
              <b-button type="submit" class="is-primary my-register-button" expanded @click="handleSubmit(register)">Register</b-button>
            </b-field>
            <p class="has-text-dark has-text-centered">Got an account? <router-link to="/admin/login" class="btn-clear">Click here to Login</router-link></p>
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
import UserService from "@/services/UserService";

export default {
  data() {
    return {
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        confirmPassword: null,
        isAdmin: false
      }
  },
  components: {
    ValidationObserver,
    BInputWithValidation
  },
  methods: {
    async register() {

      if (this.password === this.confirmPassword){
        const response = await AuthService.register({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          isAdmin: this.isAdmin,
          color: this.avatarColor()
        })

        if (response.status !== 200) {

          if (response.data.field.toLowerCase() === 'email') {
            this.$refs.form.setErrors({
              email: response.data.message
            });
          }

          console.log('register ERROR: ', response.data.message);

        } else if (response.status === 200 && response.data.user){

       
          this.$buefy.toast.open({
            duration: 3000,
            message: 'Registered Successfully',
            type: 'is-success'
          });   

          const user = response.data.user;
          localStorage.setItem('user', user);
          console.log(user);

          (async () => {
            const response = await UserService.fetchUserDetails();
            if (response.status !== 200) console.log(response.error);
            else this.$store.dispatch('SET_USER',response.data);
          })();

          this.$store.dispatch("SET_LOGIN_STATUS", localStorage.getItem('user'));
          this.$router.push({ name: "Dashboard" });
        }
      }
    },
    avatarColor() {
      let colors = ['#eb4034', '#fcba03', '#4287f5', '#42f5a7', '#5d42f5', '#f57738'];
      return colors[Math.floor(Math.random() * colors.length)];
    },
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

.my-form {
  .my-form-input {
    display: grid;
    grid-gap: 0.5rem;
    label {
        font-weight: 600;
      }
    }
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
    padding: 3rem 3rem 3rem 3rem;
    margin-top: 45px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
}

@media only screen and (min-width: 1600px) {
  .my-form-wrapper {
    margin-top: 75px;
  }
}
    
</style>