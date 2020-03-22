<template>
  <div class="nav-wrapper" v-bind:class="{ homeNav: isHome }">
    <nav class="nav my-container">

      <h3 class="nav-brand hug">Oasis</h3>

      <div class="nav-links">
        <p>
          <router-link to="/">Home</router-link>
        </p>
        <p>
          <router-link to="/posts">Blog</router-link>
        </p>
        <p>About</p>
        <p>Contact</p>
      </div>

      <div class="menu">
        <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/robin-kylander" title="Robin Kylander">Robin Kylander</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
        <img class="menu-bars" height="30" width="50" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNzMuMTY4IDczLjE2OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNzMuMTY4IDczLjE2ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJOYXZpZ2F0aW9uIj4KCQk8Zz4KCQkJPHBhdGggZD0iTTQuMjQyLDE0LjQyNWg2NC42ODRjMi4zNDQsMCw0LjI0Mi0xLjkzMyw0LjI0Mi00LjMyNGMwLTIuMzg1LTEuODk4LTQuMzI1LTQuMjQyLTQuMzI1SDQuMjQyICAgICBDMS44OTgsNS43NzYsMCw3LjcxNiwwLDEwLjEwMUMwLDEyLjQ5MywxLjg5OCwxNC40MjUsNC4yNDIsMTQuNDI1eiBNNjguOTI2LDMyLjI1OUg0LjI0MkMxLjg5OCwzMi4yNTksMCwzNC4yLDAsMzYuNTg0ICAgICBjMCwyLjM5MywxLjg5OCw0LjMyNSw0LjI0Miw0LjMyNWg2NC42ODRjMi4zNDQsMCw0LjI0Mi0xLjkzMyw0LjI0Mi00LjMyNUM3My4xNjgsMzQuMiw3MS4yNywzMi4yNTksNjguOTI2LDMyLjI1OXogICAgICBNNjguOTI2LDU4Ljc0Mkg0LjI0MkMxLjg5OCw1OC43NDIsMCw2MC42ODMsMCw2My4wNjdjMCwyLjM5MywxLjg5OCw0LjMyNSw0LjI0Miw0LjMyNWg2NC42ODRjMi4zNDQsMCw0LjI0Mi0xLjkzNSw0LjI0Mi00LjMyNSAgICAgQzczLjE2OCw2MC42ODMsNzEuMjcsNTguNzQyLDY4LjkyNiw1OC43NDJ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  props: {
    isHome: Boolean
  }
};

</script>

<style lang="scss" scoped>
@import "../styles/app.scss";

.nav-wrapper {
  padding: 0 0 0.2rem 0;
  // box-shadow: 0 1px 3px rgba(117, 117, 117, 0.12), 0 1px 2px rgba(117, 117, 117, 0.12);
  box-shadow: 0 3px 6px rgba(117, 117, 117, 0.12), 0 3px 6px rgba(117, 117, 117, 0.12);

}

.homeNav {
  padding: 0;
  box-shadow: none;
}

.nav {
  display: grid;
  align-content: center;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 1rem 0.5rem 1rem;

  .nav-brand {
    // background-image: radial-gradient(circle at 10% 20%, rgb(253, 193, 104) 0%, rgb(251, 128, 128) 90%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    font-weight: 300;
    align-self: end;
    font-size: 1.621rem;
    color: $primary;
    margin-top: 0.7rem;
  }

  .nav-links {
    display: none;
  }

  .menu {
    width: max-content;
    justify-self: end;
    align-self: end;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 700px) {
  .nav {
    margin: 0 2rem 1.2rem 2rem;
    
    .nav-links {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      justify-self: end;
      grid-gap: 35px;
      align-self: end;

      a {
        text-decoration: none;
      }
    }

    .menu {
      display: none;
    }
  }
}

@media only screen and (min-width: 1200px) {
  .nav {
    margin: 0 auto 0.8rem auto;
  }
}
</style>
