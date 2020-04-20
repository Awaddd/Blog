<template>
  <div class="author-section">
    <div class="container">
      <h1 class="title is-size-4">Meet the author</h1>
      <div class="author-section-wrapper">
        <div class="author-section-media">
          <figure class="image is-128x128">
            <img src="../assets/person.png" alt="">
          </figure>
          <h2 class="is-size-5-mobile is-size-4">{{user.firstName}} {{user.lastName}}</h2>
          
        </div>
        <div class="author-section-bio">
          <h3 class="is-size-6-mobile is-size-5">Studied at Yale. Writes for the daily waffle.</h3>
          <br>
          <p>{{user.bio}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        firstName: 'Awad',
        lastName: 'Dini',
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nam rem iure fuga delectus unde amet vel, quidem architecto enim. Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consequuntur voluptatibus est reiciendis iure at accusamus, tempore voluptas omnis quasi.'
      }
    }
  }
}
</script>

<style lang="scss">

.author-section {
  padding: 3rem 0;
}

.author-section-wrapper {
  display: grid;
  grid-gap: 20px;
}

.author-section-media {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  grid-gap: 20px;
}

.author-section-bio {
  
}


@media only screen and (min-width: 1600px) {
  .author-section-media {

  }
}
</style>