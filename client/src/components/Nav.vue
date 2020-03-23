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

            <router-link class="my-btn-nav has-background-primary" :to="{name: 'Login'}">
              Log In
            </router-link>
          </div>
        </div>
      </div>


    </nav>
  </div>
</template>
  
<script>
export default {
  
}
</script>

<style lang="scss">
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
  }

  .navbar-item {
    a:hover {
      color: #fff;
    }
  }
</style>