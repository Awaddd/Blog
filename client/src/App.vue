<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view class="router-view"/>

  </div>
</template>


<script>
import Nav from "@/components/Nav.vue";

export default {
  components: {
    "app-nav": Nav,
  }  
}
</script>


<style lang="scss">
@import "./styles/app.scss";


html,
body {
  margin: 0;
  // font-family: $font-family;
  // font-weight: 300;
  // font-size: 18px;
  // line-height: 1.9;
  // color: $accent;
  height: 100%;

  // font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
  // line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));

}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  position: relative;
}

.header-top {
  background: $secondary;
  padding: 1.5rem;
}

.hero {
  padding: 0 1.5rem;
  background: #fff;
  color: #000;
  text-align: center;
}

.brand {
  color: #333;
}

.router-view {
  // padding below required for footer -
  // must be the same as the footer height
  padding-bottom: 100px;
  margin: 0;
}

.footer {
  background: #fff;
  color: #333;
  display: grid;
  justify-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 100px;
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
