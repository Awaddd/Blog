<template>
  <div class="author-section">
      <!-- <h1 class="title is-size-4">Meet the author</h1> -->
      <div class="author-section-title">
        <h2 class="title is-size-5">Meet The Author</h2>
        <hr class="subtitle">
      </div>
      
      <div class="author-section-wrapper">
        <div class="author-section-media">
          <figure class="image is-128x128">
            <img src="../assets/person.png" alt="">
          </figure>
          <div class="author-section-bio">
            <h2 class="title is-size-5-mobile is-size-4">{{user.firstName}} {{user.lastName}}</h2>
            <h3 class="subtitle is-size-6-mobile is-size-6">{{user.bio}}</h3>
            <div class="icon-group">
              <a href="">
                <b-icon class="facebook" icon="facebook"></b-icon>
              </a>
              <a href="">
                <b-icon class="twitter" icon="twitter"></b-icon>
              </a>
              <a href="">
                <b-icon class="linkedin" icon="linkedin"></b-icon>
              </a>
            </div>
          </div>
          
        </div>
        <div class="author-section-bio">
          <!-- <p>{{user.bio}}</p> -->
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
        bio: 'Studied at Yale. Writes for the daily waffle.'
      }
    }
  }
}
</script>

<style lang="scss">

.icon-group {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 12px;
  justify-content: center;
}

.facebook {
  color: #3b5999;
}

.twitter {
  color: #55acee;
}

.linkedin {
  color: #0077B5;
}

.author-section {
  margin-top: 3rem;
  display: grid;
  grid-gap: 3rem;
}

.author-section-title {
  // display: grid;
  // justify-items: center;
}

.author-section-wrapper {
  display: grid;
  grid-gap: 20px;
}

.author-section-media {
  display: grid;
  justify-items: center;
  grid-gap: 20px;
}

.author-section-bio {
  text-align: center;
}


@media only screen and (min-width: 770px) {
  .author-section {
    // padding: 3rem 0;
    margin-top: 3rem;
  }

  .icon-group {
    justify-content: start;
    margin-top: -0.5rem;
  }

  .author-section-media {
    grid-template-columns: max-content max-content;
    align-items: center;
    grid-gap: 20px;
  }

  .author-section-bio {
    text-align: start;
  }
}

</style>