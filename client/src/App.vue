<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view class="router-view"/>
    <footer class="footer">
      <div class="content has-text-centered">
        <p><strong>Dini's Oasis </strong> &copy; 2020</p>
      </div>
    </footer>
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
</style>
