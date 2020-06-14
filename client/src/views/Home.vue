<template>
  <div class="home">

    <header>

      <section class="welcome-content is-medium has-text-centered">
        <img class="welcome-content-image" src="../assets/oasis.jpg" width="100%">
        <span class="welcome-content-shade"></span>
        <div class="hero-body">
          <div class="container">
            <h1 class="title has-text-white is-size-4-mobile is-size-3-tablet">
              Welcome To Oasis
            </h1>
            <h2 class="subtitle has-text-white is-size-5">
              Life and Success
            </h2>
          </div>
        </div>
      </section>
    </header>

    <main class="my-container home-content">
      
      <section class="featured-section-wrapper container">
        <app-featured-post></app-featured-post>        
      </section>


      <section class="home-posts">
        <!-- add is-paddingless to remove padding on section -->
        <app-posts :title="title" :showAmount="3"></app-posts>     
      </section>



    </main>

    <section class="section has-background-primary contact-section-wrapper" id="contact">
      <app-contact></app-contact>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import AppPosts from "@/components/AppPosts.vue";
import Contact from "@/components/Contact.vue";
import FeaturedPost from "@/components/FeaturedPost.vue";

export default {
  name: "home",
  data () {
    return {
      title: 'Latest Posts'
    }
  },
  components: {
    "app-posts": AppPosts,
    "app-contact": Contact,
    "app-featured-post": FeaturedPost
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.my-home-hero {
  margin: 0;
}

.home {

  .welcome {
    background-image: radial-gradient(circle at 10% 20%, #4facfe 0%, #00f2fe 90%);
    text-align: center;
    color: #fff;
    padding: 1.2rem 0 0.8rem 0;

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
    display: grid;
    grid-gap: 15px;
  }
  
}

.featured-section-wrapper {
  padding: 3rem 1.5rem 1rem 1.5rem;
}

.home-posts {
  margin: 0;
  padding: 1rem 1.5rem;
}


@media only screen and (min-width: 700px) {
  
  .home {
    .home-content {
      margin-top: 1rem;
    }
  }

  .my-page-title {
    padding: 20px 0 30px 0;
  }

  .featured-section-wrapper {
    padding: 3rem 1.5rem 0 1.5rem;
  }

  .contact-section-wrapper {
    margin-top: 3rem;
  }
}

@media only screen and (min-width: 1000px) {
  .home .home-content {
    padding: 0;
  }
  .home-posts {
    padding: 1.5rem 0;
  }

}

@media only screen and (min-width: 1200px) {
  .home-posts {
    margin: 0;
    padding: 3rem 1.5rem;
  }
  
  .featured-section-wrapper {

  }
  
}
</style>
