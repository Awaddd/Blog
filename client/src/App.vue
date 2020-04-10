<template>
  <div id="app">
    <header>
      <app-nav></app-nav>
    </header>
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

body {

}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.router-view {
  flex: 1 0 auto;
}

</style>
