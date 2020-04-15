<template>
  <div class="">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span class="dashboard-breadcrumbs-current">Overview</span>
      </p>
    </nav>    
    
    <div class="section overview-wrapper">

      <div class="has-text-centered">
        <h1 class="title is-size-4-mobile">Lorem, ipsum dolor</h1>
        <p class="subtitle is-size-6-mobile">sipsue aso ipsum dolor sit Nobis, ipsum.</p>
      </div>

      

      <!-- <div class="overview-content container"> -->
      <div class="overview-content">
      <p class="is-size-7-mobile is-size-6 has-text-centered">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        At libero vel sunt optio delectus harum? Totam error ut quasi dolorum iusto commodi corporis omnis libero necessitatibus facilis! 
        Iusto quos voluptate provident fugiat explicabo quia quibusdam, exercitationem eveniet voluptatibus quae ipsum!</p>
      
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

@media only screen and (min-width: 770px) {
  .overview-content {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }
}

</style>