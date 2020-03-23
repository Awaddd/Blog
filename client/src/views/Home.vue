<template>
  <div class="home">

    <header>
      <app-nav :isHome="true"></app-nav>

      <!-- <section class="hero my-gradient"> -->
      <section class="hero is-primary is-bold my-home-hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title has-text-white is-size-4-mobile is-size-3-tablet">
              Welcome To My Oasis
            </h1>
            <h2 class="subtitle has-text-white is-size-5">
              Life and Success
            </h2>
          </div>
        </div>
      </section>
    </header>

    <main class="my-container home-content">
      
      <section class="featured-post section">

        <nav class="level is-mobile">
          <div class="level-left">
            <p class="level-item subtitle has-text-primary">Featured</p>
          </div>
          <div class="level-right">
            <p class="level-item subtitle is-6"><strong>Feb 20, 2019</strong></p>
          </div>
        </nav>

        <div class="featured-post__image">
          <img src="../assets/featured.jpeg">
        </div>

        <div class="featured-post__title">
          <h5 class="">Google's AI can now predict heart disease 
            just by scanning your eyes.</h5>
        </div>

        <div class="read-more__button">
          <button class="has-background-primary my-btn">READ MORE</button>
        </div>
      </section>

      <section class="latest-posts">

          <p class="title">Latest</p>
          
          <app-posts :showAmount="6"></app-posts>

      </section>

    </main>

    <section class="section is-medium has-background-primary">
      <div class="container">
        <div class="content has-text-centered">
          <h1 class="title has-text-white">Newsletter</h1>
          <p class="subtitle is-4 has-text-white">Want to be the first to know when a new article comes out?</p>
          <button class="my-btn">Notify Me</button>
        </div>

        <!-- <div class="">
          <div class="field">
            <div class="control">
              <input type="text" class="my-home-input" placeholder="Email">
            </div>
          </div>
          <div>
            <button class="my-btn">Notify Me</button>
          </div>
        </div> -->

      </div>
    </section>


    <!-- <footer class="footer">
      <div class="content has-text-centered">
        <p><strong>Dini's Oasis </strong> &copy; 2020</p>
      </div>
    </footer> -->

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

.my-gradient {
  background-image: radial-gradient(circle at 10% 20%, #00f2fe 0%, #00dde9 50%, #00f2fe 100%);
}

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

    .featured-post {
  
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
        grid-row-end: 1;
      }

      .featured-post__image {
        img {
          // max-width: 300px;
          width: 100%;
        }
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 7;
      }

      .featured-post__title {
        background: rgb(0, 0, 0);
        color: #fff;
        padding: 0.6rem;
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 4;
        grid-row-end: 7;
        opacity: 0.8;
      }

      .read-more__button {
        display: none;
      }
    }
    // adds padding to latest, instead of using section
    .latest-posts {
      padding: 0 1.5rem;
    }
  }

}

@media only screen and (min-width: 700px) {

  .my-home-input {
    width: 600px;
    padding: 0.8rem 0.5rem;
  }

  .home {
    .welcome {
      padding: 2rem 0 1.8rem 0;
      .welcome__message {
        font-size: 1.6rem;
        line-height: 1.6rem;
        font-weight: 400;
      }
      .welcome__slogan {
        font-size: 1rem;
        font-weight: 100;
        opacity: 0.9;
      }
    }

    .home-content {
      margin-top: 1rem;
      // padding: 2rem;
      // grid-gap: 50px;

      .featured-post {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        max-width: 100%;
        grid-column-gap: 30px;

        .featured-post__details {
          font-size: 0.8rem;

          grid-column-start: 1;
          grid-column-end: 1;
          grid-row-start: 1;
          grid-row-end: 1;

          .featured-post__details__date {
            justify-self: end;
          }
        }

        .featured-post__image {
          img {
            width: 100%;
          }
          grid-column-start: 2;
          grid-column-end: 4;
          grid-row-start: 1;
          grid-row-end: 4;
        }

        .featured-post__title {
          // background: #6F98EC;
          background: 0;
          color: #333;
          padding: 0.4rem;
          
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 2;
          grid-row-end: 2;
          opacity: 1;
          padding: 0;
          

          // CANT BE H5 - CHANGE IN HTML !!!!!!!!
          h5 {
            font-size: 1.2rem;
            line-height: 1.5;
          }
        }

        .read-more__button {
          display: block;
        }


      }

      .latest-posts {
        display: grid;
        grid-gap: 20px;
      }
    }
  }
}

</style>
