<template>
  <div class="container">
    
    <b-navbar class="is-spaced">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <p class="title is-3 has-text-primary">Oasis</p>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">Home</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Posts' }">All Posts</b-navbar-item>
        <b-navbar-dropdown label="More">
          <b-navbar-item>News Letter</b-navbar-item>
          <b-navbar-item>Contact</b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-item tag="div">
          <div class="" v-if="getLoginStatus">
            <router-link tag="button" :to="{name: 'Dashboard' }" class="my-btn-nav my-btn-dashboard">Dashboard</router-link>
            <button class="my-btn-nav has-background-danger" @click="logout">Logout</button>
          </div>
          <div class="" v-else>
            <router-link class="my-btn-nav my-btn-dashboard" :to="{name: 'Register'}">Register</router-link> 
            <router-link class="my-btn-nav has-background-primary" :to="{name: 'Login'}">Login</router-link> 
          </div>
        </b-navbar-item>
      </template>

    </b-navbar>

  </div>
</template>
  
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(["getLoginStatus"])
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$store.dispatch("SET_LOGIN_STATUS", null);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../styles/app.scss";

  .my-brand {
    display: grid;
    grid-gap: 15px;
  }

  .my-nav-btn {
    box-sizing: border-box;
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .my-btn-nav {
    color: rgba(255, 255, 255, 0.897);
    text-transform: uppercase;
    border-radius: 2px;
    border: 0;
    padding: 6px 35px;
    font-size: 0.9rem;
    font-weight: 600;
    // margin: 0;
    box-sizing: border-box;
  }

  .my-btn-dashboard {
    background-color: #FFF;
    color: $primary;  
    font-weight: 700;
  }

  .my-btn-dashboard:hover {
    background-color: #FAFAFA !important;
    color: $primary !important;
    transition: all 0.2s ease-in-out;
  }

  .login-btn {
    background: #FAFAFA;
    border: 1px solid $primary;
    color: $primary;
    border-radius: 2px;
    font-weight: 700;
  }

  .login-btn:hover {
    background-color: $primary;
    color: #fff;
    transition: all 0.2s ease-in-out;
  }

  .navbar-item {
    a:hover {
      color: #fff;
    }
  }

  .my-profile {
    display: grid;
    grid-template-columns: max-content max-content;
    padding: 0 2rem;
    align-items: bottom;
    align-content: bottom;
  }

</style>