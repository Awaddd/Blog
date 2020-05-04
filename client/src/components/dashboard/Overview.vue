<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span class="dashboard-breadcrumbs-current">Overview</span>
      </p>
    </nav>    
    
    <div class="overview-wrapper">

      <div class="overview-header">
        <h1 class="title is-size-4-tablet is-size-5">Welcome to your dashboard</h1>
        <p class="subtitle is-size-6-mobile">All your content in one place</p>
      </div>

      

      <!-- <div class="overview-content container"> -->
      <div class="overview-content">
      <!-- <p class="is-size-7-mobile is-size-6 has-text-centered">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        At libero vel sunt optio delectus harum? Totam error ut quasi dolorum iusto commodi corporis omnis libero necessitatibus facilis! 
        Iusto quos voluptate provident fugiat explicabo quia quibusdam, exercitationem eveniet voluptatibus quae ipsum!</p> -->

        <div class="overview-points">
          <div class="overview-points-item">
            <b-icon class="overview-points-item-icon" icon="brush" size="is-medium"></b-icon>
            <p>Blog posts? Stories? Reviews? Journals? Everything you need to make whatever content you want - and all in one place</p>
          </div>

          <div class="overview-points-item">
            <b-icon class="overview-points-item-icon" icon="animation" size="is-medium"></b-icon>
            <p>Manage your content. Make your content appear exactly how you want the world to see it</p>
          </div>

          <div class="overview-points-item">
            <b-icon class="overview-points-item-icon" icon="desktop-mac" size="is-medium"></b-icon>
            <p>Edit &amp; Update or delete content however you see fit. It's in your control</p>
          </div>

          <!-- <p class="overview-points-item">
            <b-icon class="overview-points-item-icon" icon="star" size="is-medium"></b-icon>
            Set featured posts &amp; more!
          </p> -->

        </div>
        <figure class="image overview-image">
          <img src="../../assets/overview.svg" alt="">
        </figure>
      </div>
    </div>

  </div>
</template>


<style lang="scss">

  .overview-wrapper {
    display: grid;
    grid-gap: 40px;
  }

  .overview-header {
    // padding: 0 1.5rem;
  }

  .overview-content {
    display: grid;
    grid-gap: 30px;
    justify-content: center;
    justify-items: center;
  }
  .overview-image {
    max-width: 300px;
  }

  .overview-points {
    display: grid;
    grid-gap: 30px;
  }

  .overview-points-item {
    display: grid;
    // justify-content: center;
    // justify-items: center;
    // text-align: center;
    padding: 0 1.5rem;
    grid-gap: 10px;
  }

  .overview-points-item-icon {
    color: #92c5ff;
  }

@media only screen and (min-width: 770px) {
  .overview-content {
    grid-template-columns: 3fr 2fr;
    align-content: center;
    align-items: center;
    padding: 2rem;
    grid-gap: 20px;
  }

  .overview-points-item {
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: 20px;
  }

}

@media only screen and (min-width: 1000px) {

  .overview-wrapper {
    grid-gap: 20px;
  }

  .overview-header {
    margin-left: 2rem;
  }

  .overview-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 1600px) {
  .overview-wrapper {
    grid-gap: 0;
  }

  .overview-points-item {
    grid-gap: 30px;
  }

  .overview-content {
    padding: 5rem 2rem;
  }

}

</style>