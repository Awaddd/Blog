<template>
  <div class="home">

    <header>
      <app-nav></app-nav>

      <section class="welcome">
        <h3 class="welcome__message hug">Welcome to Dini's Oasis</h3>
        <h4 class="welcome__slogan hug">Life and Success</h4>
      </section>
    </header>

    <main class="container home-content">
      
      <section class="featured-post">
        <div class="featured-post__details">
          <p class="highlight hug">Featured</p>
          <p class="featured-post__details__date hug">Feb 20, 2019</p>
        </div>



        <div class="featured-post__image">
          <img src="../assets/featured.jpeg">
          <!-- <img src="../assets/featured.jpeg" alt="" height="150" width="225"> -->
        </div>

        <div class="featured-post__title">
          <h5 class="hug">Google's AI can now predict heart disease 
            just by scanning your eyes.</h5>
        </div>
      </section>

    </main>

  </div>
</template>

<script>
// @ is an alias to /src
import AppPosts from "@/components/AppPosts.vue";
import Nav from "@/components/Nav.vue";

export default {
  name: "home",
  components: {
    "app-posts": AppPosts,
    "app-nav": Nav
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.home {
  .welcome {
    background-image: radial-gradient(circle at 10% 20%, rgb(253, 193, 104) 0%, rgb(251, 128, 128) 90%);
    text-align: center;
    color: #fff;
    padding: 1.2rem 0;
    .welcome__message {
      font-size: 1.3rem;
      line-height: 1.25rem;
      font-weight: 400;
    }
    .welcome__slogan {
      opacity: 0.9;
    }
  }

  .home-content {
    padding: 1rem;

    .featured-post {
      display: grid;
      grid-gap: 0.2rem;
      max-width: 400px;
      margin: 0 auto;

      .featured-post__details {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: max-content max-content;
        font-size: 0.6rem;

        .featured-post__details__date {
          justify-self: end;
        }
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
      }

      .featured-post__image {
        img {
          // max-width: 300px;
          width: 100%;
        }
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 3;
        grid-row-end: 7;
      }

      .featured-post__title {
        background: #333;
        color: #fff;
        padding: 0.4rem;
        
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 4;
        grid-row-end: 7;
        opacity: 0.8;
      }


    }
  }

}

@media only screen and (min-width: 700px) {
  .home-content {
    padding: 0;
  }
}

</style>
