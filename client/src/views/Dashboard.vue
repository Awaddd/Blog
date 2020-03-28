<template>
    <section class="section wallpaper-wrapper">
      <div class="container">

        <div class="columns dashboard-wrapper has-background-white">
          <div class="column is-2 dashboard-aside-wrapper">

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

            <aside class="menu dashboard-aside" role="navigation" aria-label="main navigation">
              <div class="dashboard-aside-header">
                <h5 class="is-size-5">Manage Posts</h5>
              </div>
              <p class="menu-label my-icon-group"> <i class="material-icons">description</i> <span>Article</span></p>
              <ul class="menu-list">
                <li><a @click="setActive('newPost')">New Post</a></li>
                <li><a @click="setActive('allPosts')">All Posts</a></li>
              </ul>
              <ul class="menu-list">
                <li><a>New Toilet Paper</a></li>
              </ul>
              <p class="menu-label my-icon-group">
                <i class="material-icons">question_answer</i>
                <span>Toilet Paper v2</span>
              </p>
            </aside>


          </div>

          <div class="column">

            <section class="hero is-small">
              <div class="hero-body">
                <div class="container">
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

export default {
    data () {
      return {
        user: {

        },
        activeItem: 'allPosts',
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
        console.log(`dashboard`);
        console.log(`${post}`);
        this.activeItem = 'editPost';
        this.postID = post;
        console.log("LOOOOOOOOL");
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
        this.activeItem = item;
      }
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

.dashboard-wrapper {
  border: 1px solid #eeeeee;
}

.dashboard-aside-wrapper {
  background-color: #0e2f50;
  border: 1px solid #eeeeee;
  margin: 0;
  padding: 0;
}

.dashboard-aside {
  background-color: #fff;
  padding: 0.75rem;
  box-sizing: border-box;
}

.dashboard-aside-header {
  padding: 1rem;
}

.dashboard-content-wrapper {
  padding: 2rem 0;
}

.my-icon-group {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 1rem;
}

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