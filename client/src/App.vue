<template>
  <div id="app">


    <router-view/>

    <!-- <footer class="footer">
      <div class>
      </div>
    </footer> -->

    <!-- https://medium.com/@anaida07/mevn-stack-application-part-2-2-9ebcf8a22753 -->
  </div>
</template>





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

.main-app {
  // padding below required for footer -
  // must be the same as the footer height
  padding-bottom: 200px;
  margin: 0 2rem;
}

.footer {
  // background-color: #000;
  background-color: $secondary;
  color: #fff;
  // padding: 6rem;
  // margin: 4rem 0 0 0;
  text-align: center;
  box-sizing: border-box;

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
