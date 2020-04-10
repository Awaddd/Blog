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
      
      <section class="featured-post section" v-if="featuredPost">

        <nav class="level is-mobile my-featured-level">
          <div class="level-left">
            <p class="level-item subtitle has-text-primary">Featured</p>
          </div>
          <div class="level-right">
            <p class="level-item subtitle is-6"> <strong> {{formatDate(featuredPost.createdAt)}} </strong> </p>
          </div>
        </nav>

        <div class="featured-post__image">
          <img :src="featuredPost.image">
          <!-- <img src="../assets/featured.jpeg"> -->
        </div>

        <div class="my-featured-post-content">

          <h1 class="title is-5 is-size-6-mobile is-capitalized has-text-centered-mobile has-text-left-tablet featured-post__title"> {{featuredPost.title}} </h1>

          <div class="level featured-post-tags" v-if="featuredPost.tags">
            <div class="level-item">
              <div class="field is-grouped is-grouped-multiline" >
                <div class="control" v-for="(tag, i) in featuredPost.tags.slice(0, 4)" :key="i">
                  <div class="tags">
                    <!-- <a class="tag is-link ">{{tag}}</a> -->
                    <b-tag ellipsis>{{tag}}</b-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>



        <div class="featured-post__read-more">
          <!-- <button class="my-btn read-more-btn">READ MORE</button> -->
          <b-button tag="router-link" :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(featuredPost.title)}}" class="my-btn read-more-btn">Learn More
          </b-button>
        </div>
      </section>


      <section class="section home-posts">
        <!-- add is-paddingless to remove padding on section -->
          <div class="container">
            <p class="title is-size-5-mobile is-size-4 has-text-primary has-text-centered my-page-title">Latest Posts</p>
            <app-posts :showAmount="6"></app-posts>
          </div>          
      </section>



    </main>

    <section class="section is-medium has-background-primary">
      <div class="container">
        <div class="content has-text-centered newsletter-wrapper">
          <div>
            <h1 class="title is-3 has-text-white is-size-4-mobile">Newsletter</h1>
            <p class="subtitle is-5 has-text-white is-size-6-mobile">Want to be the first to know when a new article comes out?</p>
          </div>
          <div class="newsletter-group">
            <input type="email" placeholder="John.smith@mail.com" class="input is-medium newsletter-input">
            <button class="newsletter-button">Notify Me</button>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script>
// @ is an alias to /src
import AppPosts from "@/components/AppPosts.vue";
import Nav from "@/components/Nav.vue";
import PostsService from "@/services/PostsService";
import { formatDate, sanitizeTitle } from '@/helpers/helpers';


export default {
  name: "home",
  data () {
    return {
      featuredPost: null
    }
  },
  components: {
    "app-posts": AppPosts,
    "app-nav": Nav
  },
  mounted () {
    this.fetchFeaturedPost();
  },
  methods: {
    async fetchFeaturedPost() {
      console.log('featured post');
      // const tempPost = "google's-ai-can-now-predict-heart-disease-just-by-scanning-your-eyes.";
      const response = await PostsService.fetchFeaturedPost();
      this.featuredPost = response.data;
      console.log(response);
    },
    formatDate(date) {
      return formatDate(date);
    },
    sanitizeTitle(title) {
      return sanitizeTitle(title);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.my-home-hero {
  margin: 0;
}

.newsletter-wrapper {
  display: grid;
  grid-gap: 30px;
}

.featured-post__read-more {
  display: grid;
  margin: 0 auto;
}

 .read-more-btn {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 10px 20px;
  height: auto;
}

.read-more-btn:hover {
  background: #006fee;
  color: #fff;
  transition: all 0.2s ease-in-out;
}

.newsletter-group {
  display: grid;
  grid-gap: 15px;
}

.newsletter-button {
  @extend .my-btn;
  // background: #f2ff00;
  // background: #ffe600;
  background: #006fee;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // text-transform: none;
  letter-spacing: 2px;
}

.newsletter-button:hover {
  background: #004bd6;
  transition: all 0.2s ease-in-out;
}

.newsletter-input {
  text-align: center;
}

.newsletter-input::placeholder {
  font-size: 1rem;
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

    .featured-post {
      
      padding: 3rem 1.5rem 0 1.5rem;

      display: grid;
      grid-gap: 20px;
  
      .featured-post__image {
        img {
          // max-width: 300px;
          width: 100%;
        }
      }

    }

    .my-page-title {
      padding: 0 0 10px 0;
    }
  }

   .my-featured-level {
   margin-bottom: 0;
 }

  .home-posts {
    margin: 0;
    padding: 1rem 1.5rem;
  }

}

@media only screen and (min-width: 700px) {
  
  .my-page-title {
    padding: 20px 0 30px 0;
  }

  .newsletter-group {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: 15px;
    button {
      padding: 0.8rem 36px;
    }
    input {
      min-width: 500px;
    }
    margin: 0 auto;
  }

  .featured-post__read-more {
    display: block;
  }

  .home {

    .home-content {
      margin-top: 1rem;
      // padding: 2rem;
      // grid-gap: 50px;

      .featured-post {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        max-width: 100%;
        grid-column-gap: 50px;
        grid-row-gap: 10px;

        .featured-post__image {
          img {
            width: 100%;
          }
          grid-column-start: 2;
          grid-column-end: 4;
          grid-row-start: 1;
          grid-row-end: 4;
        }

      }
    }
  }
}

@media only screen and (min-width: 770px) {
  .featured-post__read-more {
    margin: 0;
  }
  .featured-post-tags {
    display: grid !important;
    margin: 0;
  }
}

@media only screen and (min-width: 1200px) {

  .newsletter-wrapper {
    grid-gap: 40px;
  }

  .featured-post {
    padding: 3rem 1.5rem 6rem 1.5rem;
    display: grid;
    grid-column-gap: 70px !important;
  }

  .read-more-btn {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 16px 45px;
  }

  .newsletter-input::placeholder {
    font-size: 1.1rem;
  }
}
</style>
