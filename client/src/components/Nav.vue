<template>
  <div class="container">
    <nav class="navbar is-spaced" role="navigation" aria-labrl="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'Home'}">
          <!-- <img src="../assets/brand.png" class="image is-32x32"> -->
          <p class="title is-3 has-text-primary">Oasis</p>
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="my-navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="my-navbar" class="navbar-menu">

        <div class="navbar-end">
          <router-link class="navbar-item" :to="{name: 'Home'}">
            Home
          </router-link>

          <router-link class="navbar-item" :to="{name: 'Posts'}">
            All Posts
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" :to="{}">
                News Letter
              </router-link>
              <router-link class="navbar-item" :to="{}">
                Contact
              </router-link>
            </div>
          </div>
          <div class="navbar-item">

            <!-- <router-link class="my-btn-nav has-background-primary" :to="{name: 'Login'}">
              Log In
            </router-link> -->

            <div class="field is-grouped" v-if="getLoginStatus">

              <router-link class="my-btn-nav my-btn-dashboard" tag="button" :to="{name: 'Dashboard'}">
                Dashboard
              </router-link>
              <button class="my-btn-nav has-background-danger" @click="logout">Logout</button>
<!-- 
              <div class="my-profile">
                <b-icon type="is-primary" icon="account"></b-icon>
                <span>Awad</span>
              </div> -->

            </div>
            <div v-else class="field is-grouped">
              <router-link class="my-btn-nav my-btn-dashboard" :to="{name: 'Register'}">Register</router-link> 
              <router-link class="my-btn-nav has-background-primary" :to="{name: 'Login'}">Login</router-link> 
            </div>

            
          </div>
        </div>
      </div>


    </nav>
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
  .my-btn-nav {
    color: rgba(255, 255, 255, 0.897);
    text-transform: uppercase;
    border-radius: 2px;
    border: 0;
    padding: 6px 35px;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
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