<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span class="dashboard-breadcrumbs-current">Overview</span>
      </p>
    </nav>    
    
    <div class="overview-wrapper">

      <div class="has-text-centered">
        <h1 class="title is-size-4-mobile">Welcome to your dashboard</h1>
        <p class="subtitle is-size-6-mobile">All your content in one place</p>
      </div>

      

      <!-- <div class="overview-content container"> -->
      <div class="overview-content">
      <!-- <p class="is-size-7-mobile is-size-6 has-text-centered">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        At libero vel sunt optio delectus harum? Totam error ut quasi dolorum iusto commodi corporis omnis libero necessitatibus facilis! 
        Iusto quos voluptate provident fugiat explicabo quia quibusdam, exercitationem eveniet voluptatibus quae ipsum!</p> -->
        <div class="overview-points">
          <p class="overview-points-item">
            <b-icon class="overview-points-item-icon" icon="folder-plus" size="is-medium"></b-icon>
            Create Content
          </p>

          <p class="overview-points-item">
            <b-icon class="overview-points-item-icon" type="is-success" icon="animation" size="is-medium"></b-icon>
            View and sort your content
          </p>

          <p class="overview-points-item">
            <b-icon class="overview-points-item-icon" type="is-warning" icon="bell" size="is-medium"></b-icon>
            Edit &amp; Update and even remove your Content
          </p>

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


  .overview-wrapper, .overview-content {
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
    justify-content: center;
    justify-items: center;
    text-align: center;
  }

  .overview-points-item-icon {
    color: #1C86FF;
  }

@media only screen and (min-width: 770px) {
  .overview-content {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    align-content: center;
    align-items: center;
    padding: 2rem;
  }

}

</style>