<template>
    <section class="section wallpaper-wrapper">
      <div class="container">

        <div class="columns is-tablet dashboard-wrapper has-background-white">
          <div class="column is-3-tablet is-2-desktop dashboard-aside-wrapper">

            <div class="my-burger-wrapper">
              <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <aside class="menu dashboard-aside" role="navigation" aria-label="main navigation">

              <div class="dashboard-aside-content-wrapper">
                <div class="dashboard-aside-header">
                  <h5 class="is-size-5">Manage Posts</h5>
                </div>

                <div class="menu-label my-icon-group">
                  <div class="field is-grouped my-icon-group">
                    <b-icon icon="book-open-variant" type="is-primary"></b-icon>
                    <p class="is-size-5 title">Posts</p>
                  </div>
                </div>

                <ul class="menu-list">
                  <li><a @click="setActive('allPosts')">All Posts</a></li>
                  <li><a @click="setActive('newPost')">New Post</a></li>
                </ul>

                <div class="menu-label my-icon-group">
                  <div class="field is-grouped my-icon-group">
                    <b-icon icon="view-dashboard" type="is-primary"></b-icon>
                    <p class="title is-size-5">Journals</p>
                  </div>
                </div>

                <ul class="menu-list">
                  <li><a>All Journals</a></li>
                  <li><a>New Journal</a></li>
                </ul>

                <div class="menu-label my-icon-group">
                  <div class="field is-grouped my-icon-group">
                    <b-icon icon="view-dashboard" type="is-primary"></b-icon>
                    <p class="title is-size-5">Stories</p>
                  </div>
                </div>
                
                <ul class="menu-list">
                  <li><a>All Stories</a></li>
                  <li><a>New Story</a></li>
                </ul>
              </div>

            </aside>


          </div>

          <div class="column">

            <section class="hero is-small">
              <div class="hero-body">
                <div class="container has-text-centered">
                  <h1 class="title has-text-primary">Dashboard</h1>
                  <p class="subtitle is-size-5">Manage your blog here <span class="is-capitalized">{{user.firstName}}</span></p>
                </div>
              </div>
            </section>

            <div class="dashboard-content-wrapper">

              <section v-if="this.activeItem === 'allPosts'">
                <posts-table></posts-table>
              </section>
                

              <section v-if="this.activeItem === 'newPost'"> 
                <div class="container new-post-wrapper">
                  <new-post></new-post>
                </div>
              </section>

              <section v-if="this.activeItem === 'editPost'"> 
                <div class="container new-post-wrapper">
                  <edit-post :postID="postID"></edit-post>
                </div>
              </section>

            </div>

          </div>
        </div>
       </div>

    </section>
</template>

<script>

import AuthService from "@/services/AuthService";
import Nav from "@/components/Nav.vue";
import NewPost from "@/components/NewPost.vue";
import PostsTable from "@/components/PostsTable.vue";
import EditPost from "@/components/EditPost.vue";
import {getToken} from "@/helpers/helpers";
import { serverBus } from '../main';
import { mapGetters } from 'vuex';

export default {
    data () {
      return {
        user: {

        },
        postID: ''
      }
    },
    components: {
    "app-nav": Nav,
    "new-post": NewPost,
    "posts-table": PostsTable,
    "edit-post": EditPost
    },
    created() {
      serverBus.$on('editPost', (post) => {
        console.log(`${post}`);
        this.$store.dispatch("SET_ACTIVE_DASHBOARD_TAB", 'editPost');
        this.postID = post;
      })
    },
    mounted() {
      this.getAdminData();
    },
    methods: {
      async getAdminData() {

        const decoded = getToken();
        if(decoded) {
          const response = await AuthService.fetchUserData(decoded.userID);
          this.user = response.data;
          console.log(this.user);
        }
      },  
      setActive (item) {
        this.$store.dispatch("SET_ACTIVE_DASHBOARD_TAB", item);
      }
    },
    computed: {
      ...mapGetters({activeItem: 'getActiveDashboardTab'})
    }
}
</script>


<style lang="scss">
@import "../styles/app.scss";

html, body {
  height: 100%;
}


.wallpaper-wrapper {
  background-image: url("../assets/email-pattern.png");
  min-height: 100%;
}

.dashboard-aside-wrapper {
  // background-color: rgb(250, 253, 255);
  background-color: #fff;
  border: 1px solid #eeeeee;
  margin: 0;
  padding: 0;
}

.dashboard-aside {
  // background-color: #fff;
  padding: 0.75rem;
  box-sizing: border-box;
}

.my-burger-wrapper {
  background: #fff;
}

.dashboard-aside-content-wrapper {
  padding: 1rem;
  // background: #fff;
  display: grid;
}

.dashboard-aside-header {
  margin-bottom: 1rem;
}

.dashboard-content-wrapper {
  padding: 2rem 0;
}

.my-icon-group {
  display: grid !important;
  grid-template-columns: auto auto;
  grid-column-gap: 0.6rem;
  text-transform: capitalize;
}


// @media (max-width:1200px) and (min-width:800px) {
//   .wallpaper-wrapper  {
//     background: red;
//   }
// }

@media only screen and (min-width: 1200px) {

  .dashboard-wrapper {
    min-height: 600px;
  }

  .dashboard-content-wrapper {
    padding: 2rem;
  }
}


@media only screen and (min-width: 1600px) {
  .dashboard-wrapper {
    min-height:  800px;
  }
}

</style>