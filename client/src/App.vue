<template>
  <div id="app">
    <header>
      <div class="header-top">
        <div class="socials"></div>
        <div class="searchbar"></div>
      </div>

      <section class="hero">
        <div>
          <h1>Oasis</h1>
        </div>
      </section>

      <app-nav></app-nav>
    </header>

    <main class="main-app container">
      <hr>
      <router-view/>
    </main>

    <footer class="footer">
      <div class></div>
    </footer>

    <!-- https://medium.com/@anaida07/mevn-stack-application-part-2-2-9ebcf8a22753 -->
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
  components: {
    "app-nav": Nav
  }
};
</script>



<style lang="scss">
@import "./styles/app.scss";

html,
body {
  margin: 0;
  font-family: $font-family;
  font-weight: 300;
  font-size: 18px;
  line-height: 1.9;
  color: $accent;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  position: relative;
}

.header-top {
  background: #000;
  padding: 1.5rem;
}

.hero {
  padding: 0 1.5rem;
  background: #fff;
  color: #000;
  text-align: center;
}

.main-app {
  // padding below required for footer -
  // must be the same as the footer height
  padding-bottom: 200px;
  margin: 0 2rem;
}

.footer {
  background-color: #000;
  // padding: 6rem;
  // margin: 4rem 0 0 0;
  text-align: center;
  box-sizing: border-box;

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
}

@media only screen and (min-width: 500px) {
}

@media only screen and (min-width: 700px) {
  .hero {
    font-size: 3rem;
    margin-top: 1.5rem;
    margin-bottom: 0;
  }
  h1 {
    margin: 0;
  }
}

@media only screen and (min-width: 1200px) {
}
</style>
