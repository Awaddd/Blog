<template>
  <div class="container app-nav">
    
    <b-navbar class="is-spaced">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <!-- <p class="title is-4 has-text-primary">O<span class="has-text-dark">D</span></p> -->
          <p style="font-family: 'Courier Prime', monospace;" class="app-brand">
            Omar Dini<span class="has-text-primary">.</span>
          </p>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }" :class="[currentPage === '/' ? activeLink : '']" >Home</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Author' }" :class="[currentPage === '/author' ? activeLink : '']" >About Me</b-navbar-item>
        <b-navbar-item tag="a" @click="scrollToContact">Contact</b-navbar-item>

        <b-navbar-dropdown label="Categories">
          <template v-for="(category, i) in categories">
            <b-navbar-item tag="router-link" :to="{ name: 'AllPosts',  params: {plural: category.plural} }" 
            :class="[currentPage.includes(category.plural) ? activeLink : '']"
            :key="i">{{category.plural.charAt(0).toUpperCase() + category.plural.slice(1)}}</b-navbar-item>
          </template>
        </b-navbar-dropdown>

        <b-navbar-item tag="div">
          <div class="my-nav-controls" v-if="getLoginStatus">
            <router-link v-if="getAdminStatus" tag="button" :to="{name: 'Dashboard' }" :class="[currentPage.includes('dashboard') ? activeLink : '', 'my-btn-nav my-btn-dashboard']">Dashboard</router-link>
            <div class="my-account" v-else>
              <b-icon icon="account" class="my-account-icon"></b-icon>
              <span class="my-account-user" v-if="getUser">{{getUser.firstName}}</span>
            </div>
            <button class="my-btn-nav has-background-danger" @click="logout">Logout</button>
          </div>
          <div class="" v-else>
            <router-link class="my-btn-nav my-btn-dashboard" :to="{name: 'Register'}" :class="[currentPage.includes('register') ? activeLink : '']">Register</router-link> 
            <router-link class="my-btn-nav has-background-primary" :to="{name: 'Login'}">Login</router-link> 
          </div>
        </b-navbar-item>
      </template>

    </b-navbar>

  </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/helpers/helpers';
import PostsService from "@/services/PostsService";
import * as firebase from 'firebase/app';
require('firebase/auth');
import VueScrollTo from 'vue-scrollto';

export default {
  computed: {
    ...mapGetters(["getUser", "getLoginStatus", "getAdminStatus", "getSocialStatus"]),
    currentPage() {
      return this.$route.path;
    }
  },
  data () {
    return {
      categories: null,
      activeLink: 'active'
    }
  },
  mounted () {
    this.getCategories();
  },
  methods: {
    logout () {
      if (this.getSocialStatus) this.socialSignOut();
      localStorage.removeItem('user');
      this.$store.dispatch("SET_LOGIN_STATUS", null);
      this.$store.dispatch("SET_USER", null);
      this.$router.push('/');
    },
    socialSignOut () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch("SET_SOCIAL_STATUS", null);
      }).catch(error => console.log(error));
    },
    async getCategories () {
      const response = await PostsService.fetchCategories();
      if (response.status !== 200) console.log('Could not fetch categories');
      else if (response.status === 200){
        this.categories = response.data;
        this.$store.dispatch("SET_CATEGORIES", this.categories);
      }
    },
    async scrollToContact () {

      let options = {
        container: "body",
        duration: 500,
        easing: "ease",
        offset: 0,
        force: true,
        cancelable: true,
        onStart: false,
        onDone: false,
        onCancel: false,
        x: false,
        y: true
      }

      if (this.currentPage !== '/') {

        await this.$router.push('/');

        setTimeout(() => {
          this.$scrollTo('#contact', 500, options);
        }, 500);

      } else {
        this.$scrollTo('#contact', 500, options);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../styles/app.scss";

  .active {
    // background-color: #cce4ff !important;
    color: $primary !important;
  }

  .my-brand {
    display: grid;
    grid-gap: 15px;
  }

  .app-nav {
    // padding: 0.5rem;
    // padding-top: 0.2rem;
  }

  .app-brand {
    // font-size: 1.8rem;
    margin-left: 0.5rem;
    font-size: 1.6rem;
    line-height: 0;
    padding: 0;
  }

  .my-nav-controls {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 20px;
    justify-content: center;
  }

  .my-account {
    padding: 0 0.5rem 0 0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5px;
    align-items: center;
    // border-bottom: 3px solid rgba(0, 0, 55, 0.5);
    color: rgba(0, 0, 55, 0.5);
  }

  .my-account-user {
    font-weight: 500;
    text-transform: capitalize;
  }

  .my-account-icon {
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

@media only screen and (max-width: 360px) {
  .my-nav-controls {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: max-content;
  }
  .my-account {
    margin-left: 1rem;
    margin-right: 2.2rem;
  }
}

@media only screen and (min-width: 768px) {
  .my-nav-controls {
    grid-gap: 0;
  }
  .my-account {
    margin-left: 1rem;
    margin-right: 2.2rem;
  }
}

</style>