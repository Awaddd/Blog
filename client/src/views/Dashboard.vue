<template>
    <section class="section wallpaper-wrapper">
      <div class="container wallpaper ">

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

              <nav class="level is-mobile">
                <div class="level-left">
                  <!-- <button class="level-item button is-primary">Profile</button> -->
                </div>
                <div class="level-right">
                  <button class="level-item button is-white">Logout <i class="material-icons">exit_to_app</i></button>
                </div>
              </nav>

              <section class="hero is-small">
                <div class="hero-body">
                  <div class="container">
                    <h1 class="title has-text-primary">Dashboard</h1>
                    <h1 class="subtitle">Manage your blog here</h1>
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

              </div>

            </div>
          </div>
       </div>

    </section>
</template>

<script>

import AuthService from "@/services/AuthService";
import NewPost from "@/components/NewPost.vue";
import PostsTable from "@/components/PostsTable.vue";
import jwt from "jsonwebtoken";

export default {
    data () {
      return {
        user: {

        },
        activeItem: 'allPosts'
      }
    },
    components: {
    "new-post": NewPost,
    "posts-table": PostsTable
    },
    mounted() {
      this.getAdminData();
    },
    methods: {
      async getAdminData() {

        let user = localStorage.getItem('user');
        console.log(`dashboard: ${user}`);
        let decoded = jwt.decode(user);
        console.log(`decoded: ${decoded.userID}`);
        // console.log(`decoded: ${decoded.exp}`);


        const response = await AuthService.fetchUserData(decoded.userID);
        this.user = response.data;
        console.log(this.user);
      },
      setActive (item) {
        this.activeItem = item;
      }
    }
}
</script>


<style lang="scss">
@import '../styles/buefy.scss';




.wallpaper-wrapper {
  background-image: url("../assets/email-pattern.png");

  height: 100vh;
  // temp solution to make wallpaper fit page ^
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