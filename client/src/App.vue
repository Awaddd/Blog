<template>
  <div id="app">
    <div class="nav-wrapper">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/posts">Posts</router-link> -->

      <nav class="nav">

        <div class="nav-brand">
        JustBlogIt<span>.</span>
        </div>

        <div class="nav-links">
          <span><router-link to="/" >Home</router-link></span>
          <span><router-link to="/posts">Posts</router-link></span>
          <span>Team</span>
          <span>Icon</span>
        </div>

        <div class="menu">
          <span>Menu</span>
        </div>

      </nav>

    </div>
    <router-view/>
<!-- https://medium.com/@anaida07/mevn-stack-application-part-2-2-9ebcf8a22753 -->

  </div>
</template>


<style lang="scss">

@import './styles/app.scss';

html, body{
  margin: 0;
  font-family: $font-family;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav-wrapper {
  background: $primary;
}

nav {
  max-height: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  padding: 20px;
  margin: 0 auto;
  color: #fff;
  font-weight: $font-thin;

  .nav-brand {
    justify-self: start;
  }

  .nav-links {
    display: none;
  }

  .menu {
    border-bottom: 2px solid #fff;
    width: max-content;
    justify-self: end;
  }
}




@media only screen and (min-width: 500px) {
  nav {
    width: 80%;
    
  }
}

@media only screen and (min-width: 700px) {

  .nav {

    .nav-links {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      justify-self: end;
      grid-gap: 35px;

      a {
        text-decoration: none;
        color: #fff;
      }

    }

    .menu {
      display: none;
    }

  }

  


}

</style>
