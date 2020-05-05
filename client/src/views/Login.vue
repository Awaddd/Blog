<template>
  <!-- Got this svg background from https://www.svgbackgrounds.com/#flat-mountains -->

  <div class="my-login">

    <div class="container">
      <section class="my-form-wrapper container">
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form class="my-form container" @keyup.enter.prevent="handleSubmit(login)">

          <p class="title is-size-4 has-text-primary has-text-centered"><strong>Login</strong></p>

          <BInputWithValidation vid="email" rules="required|email" type="email" icon="email" placeholder="John.smith@mail.com" label="Email" v-model="email"/>

          <BInputWithValidation vid="password" rules="required" type="password" icon="lock" label="Password" v-model="password" password-reveal/>

          <b-field class="email-login-wrapper">
            <button type="submit" class="social-login email-login" @click.prevent="handleSubmit(login)">Login</button>
            <!-- <b-button type="submit" class="is-primary my-login-button" expanded @click="handleSubmit(login)">Login</b-button> -->
          </b-field>
  
          <p class="social-login-title">Login with socials</p>
          
          <b-field>
            <a class="social-login google-login" @click="googleLogin">
              <b-icon icon="google" class=""></b-icon>
              Google
            </a>
          </b-field>

          <b-field>
            <a class="social-login facebook-login" @click="facebookLogin">
              <b-icon icon="facebook" class=""></b-icon>
              Facebook
            </a>
          </b-field>

          <p class="has-text-dark my-subtext">Don't have an account? <router-link to="/admin/register" class="btn-clear">Register here</router-link></p>
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
import firebase from 'firebase/app';
require('firebase/auth');

export default {
    data () {
        return {
          email: null,
          password: null,
          user: null
        }
    },
    components: {
      ValidationObserver,
      BInputWithValidation
    },
    mounted () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = {};
          this.user.displayName = user.displayName
          this.user.photoURL = user.photoURL;
          this.user.email = user.email;
        }
      });
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

          (async () => {
            const response = await UserService.fetchUserDetails();
            if (response.status !== 200) console.log(response.error);
            else this.$store.dispatch('SET_USER',response.data);
          })();

          this.$store.dispatch("SET_LOGIN_STATUS", localStorage.getItem('user'));
          this.$router.push({ name: "Dashboard" });
        }
      },
      async googleLogin () {
        let google = new firebase.auth.GoogleAuthProvider();
        let creds = await firebase.auth().signInWithPopup(google).then( result => {
          let token = result.credential.accessToken;
          let user = result.user;
          let newUser = result.additionalUserInfo.isNewUser;

          this.socialLogin(user);

        }).catch(error => {
          console.log(error);
        });
      },
      async facebookLogin () {
        let facebook = new firebase.auth.FacebookAuthProvider();
        let creds = await firebase.auth().signInWithPopup(facebook).then( result => {
          let token = result.credential.accessToken;
          let user = result.user;
          let newUser = result.additionalUserInfo.isNewUser;

          this.socialLogin(user);

        }).catch(error => {
          console.log(error);
        });
      },
      async socialLogin (user) {
        let socialUser = {};
        if (user.displayName) socialUser.displayName = user.displayName;
        if (user.email) socialUser.email = user.email;
        if (user.photoURL) socialUser.photoURL = user.photoURL;

        const response = await AuthService.socialLogin(socialUser);

        if (response.status !== 200) console.log(response.data.message);
        else if (response.status === 200 && response.data.user){
          this.onSocialSuccess(response);
        }     
      },
      async onSocialSuccess(response) {
        localStorage.setItem('user', response.data.user);
        this.$store.dispatch("SET_LOGIN_STATUS", localStorage.getItem('user'));
        this.$store.dispatch("SET_SOCIAL_STATUS", true);

        const userDetails = await UserService.fetchUserDetails();
        if (response.status !== 200) console.log(userDetails.error);
        else this.$store.dispatch('SET_USER', userDetails.data);
        console.log(userDetails);

        this.$router.push({ name: "Dashboard" });
      }
   }
}
</script>

<style lang="scss" scoped>
@import "../styles/app.scss";

.my-login {
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

.my-login-button {
  margin-top: 15px;
  padding: 1.3rem 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 2px;
}

.social-login {
  display: grid;
  align-items: center;
  grid-template-columns: max-content max-content;
  grid-gap: 10px;
  background: $primary;
  color: #fff;
  border: 0;
  padding: 0.7rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 2px;
  cursor: pointer;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.social-login:hover {
  color: #fff;
}

.email-login-wrapper {
}

.email-login {
  padding: 0.7rem 0;
  width: 100%;
  justify-content: center;
}

.social-login-title {
  justify-self: center;
  margin: 0.7rem 0 1.2rem 0;
  font-weight: 600;
  font-size: 1rem;
  color: rgb(22, 22, 22);
}


.facebook-login {
  background: #4267B2;
}

.google-login {
  background: #DB4437;
}


@media only screen and (min-width: 700px) {

  .my-login {
    padding: 0;
    // overflow: hidden;
    // position: relative;
    background-color: #ff7700;
    background-image: url("../assets/Flat-Mountains.svg");
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
  }

  .my-form-wrapper {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 500px;
    border-radius: 5px;
    color: #333;
    padding: 3rem 3rem 5rem 3rem;
    margin-top: 100px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
}
    
</style>