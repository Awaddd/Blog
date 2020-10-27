<template>
  <section class="my-dashboard">
    <div class="container">
      <div class="has-background-white dashboard-container">
        <!-- aside/sidebar -->
        <div class="dashboard-nav-wrapper">

          <div class="dashboard-nav">
            <div class="dashboard-menu-header">
              <b-icon icon="view-dashboard"></b-icon>
              <span>Dashboard</span>
            </div>


            <div class="dashboard-menu-group">
              <div class="dashboard-menu-item-parent">
                <b-icon icon="account"></b-icon>
                <span>Account</span>
              </div>
              
              <router-link tag="a" class="dashboard-menu-item-child" :to="{path: '/dashboard' }" :class="[currentPage === '/dashboard' ? activeLink : '']">Overview</router-link>
              <router-link tag="a" class="dashboard-menu-item-child" :to="{path: '/dashboard/profile' }" :class="[currentPage.includes('profile') ? activeLink : '']">Profile</router-link>
              <router-link tag="a" class="dashboard-menu-item-child" :to="{path: '/dashboard/author' }" :class="[currentPage.includes('author') ? activeLink : '']">Author</router-link>

            </div>

            <div class="dashboard-menu-group">
              <div class="dashboard-menu-item-parent">
                <b-icon icon="book-open"></b-icon>
                <span>Posts</span>
              </div>

              <router-link tag="a" class="dashboard-menu-item-child" :to="{path: '/dashboard/posts/all' }" :class="[currentPage.includes('posts/all') ? activeLink : '']">All</router-link>
              <router-link tag="a" class="dashboard-menu-item-child" :to="{path: '/dashboard/posts/new' }" :class="[currentPage.includes('posts/new') ? activeLink : '']">New</router-link>

            </div>
          </div>

        </div>

        <!-- main window -->
        <div class="dashboard-content-wrapper">
          <div class="section dashboard-content">
            <router-view/>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      activeLink: 'active-dashboard-tab'
    }
  },
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
}
</script>

<style lang="scss">
@import "../styles/app.scss";

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

.active-dashboard-tab {
  color: $primary !important;
}
.active-dashboard-tab:focus {
  outline: none;
}

.dashboard-nav-wrapper {
  background: #313137;
  color: #fff;
  font-size: 1rem;
}

.dashboard-nav {
  padding: 1.3rem 0;
}

.dashboard-nav, .dashboard-menu-group {
  display: grid;
  grid-gap: 17px;
}

.dashboard-menu-header, .dashboard-menu-item-parent, .dashboard-menu-item-child {
  padding: 0 1.5rem;
}

.dashboard-menu-header {
  font-weight: 600;
}

.dashboard-menu-header, .dashboard-menu-item-parent {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 10px;
}

.dashboard-menu-item-parent {
  background: #24242A;
  padding-top: 0.7rem; padding-bottom: 0.7rem;
}

.dashboard-menu-item-child {
  margin-left: 2.3rem;
}

.dashboard-menu-group a {
  color: #fff;
}

.dashboard-menu-group a:hover {
  color: lighten($primary, 5%);
  transition: 0.2s ease-in-out all;
}

// End sidebar

.dashboard-breadcrumbs {
  font-weight: 600;
}

.dashboard-breadcrumbs-current {
  color: $primary;
  font-weight: 700;
}

.dashboard-view {
  display: grid;
  grid-gap: 30px;
}


@media only screen and (min-width: 700px) {
  
  .dashboard-view {
    padding-left: 2rem;
    padding-right: 2rem;
  }

}

@media only screen and (min-width: 1000px) {

  .my-dashboard {
    background-image: url("../assets/Liquid-Cheese.svg");
    background-attachment: fixed;
    background-size: cover;
    height: 100%;    
  }

  .dashboard-nav-wrapper {
    font-size: 0.8rem;
  }

  .dashboard-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin-top: 2rem;
    min-height: 615px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .dashboard-content-wrapper {
    display: block;
  }

  .dashboard-view {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}


@media only screen and (min-width: 1200px) {

  .dashboard-nav-wrapper {
    font-size: 0.9rem;
  }


  .dashboard-container {
    margin-top: 3rem;
    min-height: 625px;
  }

}

@media only screen and (min-width: 1400px) {

  .dashboard-nav-wrapper {
    font-size: 1rem;
  }

  .dashboard-container {
    margin: 5rem auto;
    min-height: 650px;
    max-width: 1200px;
  }

}


@media only screen and (min-width: 1600px) {

  .dashboard-view {
    grid-gap: 50px;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .dashboard-container {
    min-height: 750px;
  }
}


</style>