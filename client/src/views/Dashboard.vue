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
                <b-icon icon="book-open"></b-icon>
                <span>Posts</span>
              </div>

              <p class="dashboard-menu-item-child">All</p>
              <p class="dashboard-menu-item-child">New</p>

            </div>

            <div class="dashboard-menu-group">
              <div class="dashboard-menu-item-parent">
                <b-icon icon="book-variant"></b-icon>
                <span>Journals</span>
              </div>
              <p class="dashboard-menu-item-child">All</p>
              <p class="dashboard-menu-item-child">New</p>
            </div>

            <div class="dashboard-menu-group">
              <div class="dashboard-menu-item-parent">
                <b-icon icon="account"></b-icon>
                <span>Account</span>
              </div>
              
              <p class="dashboard-menu-item-child">Profile</p>

            </div>

          </div>

        </div>

        <!-- main window -->
        <div class="dashboard-content-wrapper section">
          <div class="container dashboard-content">

            <section>
                <posts-table></posts-table>
            </section>

          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
import PostsTable from "@/components/PostsTable.vue";

export default {
  components: {
    "posts-table": PostsTable
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

  .dashboard-nav-wrapper {
    background: #313137;
    color: #fff;
    // margin-top: 1rem;
    // padding: 0;
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
    // padding-top: 1.3rem; 
    // padding-bottom: 1.3rem;
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

  // End sidebar

  .dashboard-content-wrapper {
  }

  .dashboard-content {

  }

  .dashboard-breadcrumbs {
    font-weight: 600;
  }

  .dashboard-breadcrumbs-current {
    color: $primary;
    font-weight: 700;
  }


@media only screen and (min-width: 700px) {

  .dashboard-content-wrapper {
    margin: 0 auto;
    padding-left: 5rem; padding-right: 5rem;
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
    font-size: 1rem;
  }

  .dashboard-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    max-width: 90%;
    // max-height: 600px;
    margin: 60px auto;
    min-height: 550px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .dashboard-content-wrapper {
    padding-top: 1.5rem;
    padding-left: 2rem;
    padding-bottom: 0;
    padding-right: 2rem;
    margin: 0;
    // max-height: inherit;
    // overflow: scroll;
  }

}



@media only screen and (min-width: 1200px) {

  .dashboard-nav-wrapper {

  }

  .dashboard-container {
    min-height: 600px;
  }

  .dashboard-content-wrapper {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }

}

@media only screen and (min-width: 1400px) {


  .dashboard-container {
    margin: 75px auto;
    min-height: 650px;
  }


}


@media only screen and (min-width: 1600px) {


  .dashboard-container {
    margin: 85px auto;
    min-height: 700px;
  }


}


</style>