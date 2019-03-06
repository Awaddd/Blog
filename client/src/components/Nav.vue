<template>
  <div>
    <nav class="nav">
      <div class="nav-links">
        <span>
          <router-link to="/">Home</router-link>
        </span>
        <span>
          <router-link to="/posts">Blog</router-link>
        </span>
        <span>About</span>
        <span>Contact</span>
      </div>

      <div class="menu">
        <span>Menu</span>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/app.scss";

nav {
  max-height: 50px;
  display: grid;
  align-content: center;
  // padding: 20px;
  margin: 0 auto;
  font-weight: $font-md;

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
      justify-self: center;
      grid-gap: 35px;
      align-self: center;
      font-size: 1rem;

      a {
        text-decoration: none;
      }
    }

    .menu {
      display: none;
    }
  }
}
</style>
