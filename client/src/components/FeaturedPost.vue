<template>
  <div class="featured-post-image" v-if="(featuredPost) && (featuredPost.image)">
    <!-- How a featured post with an image looks -->
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
      <!-- <b-button tag="router-link" :to="{
          name: 'BlogPost',
          params: {title: sanitizeTitle(featuredPost.title)}}" class="my-btn read-more-btn">Learn More
      </b-button> -->

      <div class="featured-post-button-wrapper">
        <router-link class="featured-post__button" :to="{
          name: 'BlogPost',
          params: {title: sanitizeTitle(featuredPost.title)}}">
          Find Out More
        </router-link>
      </div>

    </div>
  </div>

  <!-- How a featured post without an image looks -->
  <div class="featured-post" v-else>
    <nav class="level is-mobile my-featured-level">
      <div class="level-left">
        <p class="level-item subtitle has-text-primary">Featured</p>
      </div>
      <div class="level-right">
        <p class="level-item subtitle is-6"> <strong> {{formatDate(featuredPost.createdAt)}} </strong> </p>
      </div>
    </nav>

    <div class="my-featured-post-content">

      <h1 class="title is-size-5-desktop is-size-6-mobile is-size-6-tablet is-capitalized has-text-centered-mobile has-text-left-tablet featured-post__title"> {{featuredPost.title}} </h1>
      <h3 class="subtitle is-size-6-desktop is-size-7-mobile is-size-7-tablet is-capitalized has-text-centered-mobile has-text-left-tablet featured-post__subtitle"> {{featuredPost.summary}} </h3>

      <div class="level featured-post-tags" v-if="featuredPost.tags">
        <div class="level-item">
          <div class="field is-grouped is-grouped-multiline" >
            <div class="control" v-for="(tag, i) in featuredPost.tags" :key="i">
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
      <!-- <b-button tag="router-link" :to="{
          name: 'BlogPost',
          params: {title: sanitizeTitle(featuredPost.title)}}" class="my-btn read-more-btn">Learn More
      </b-button> -->

      <div class="featured-post-button-wrapper">
        <router-link class="featured-post__button" :to="{
          name: 'BlogPost',
          params: {title: sanitizeTitle(featuredPost.title)}}">
          Find Out More
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import { formatDate, sanitizeTitle } from '@/helpers/helpers';

export default {
  data () {
    return {
      featuredPost: null
    }
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
}
</script>


<style lang="scss">
@import "../styles/app.scss";

// featured post with an image
.featured-post-image {
  display: grid;
  grid-gap: 20px;

  .featured-post__image {
    img {
      // max-width: 300px;
      width: 100%;
    }
  }

}

// featured post without an image
.featured-post {
  display: grid;
  grid-gap: 20px;

  .featured-post__image {
    img {
      // max-width: 300px;
      width: 100%;
    }
  }

}

.my-featured-level {
  margin-bottom: 0 !important;
}

.featured-post-tags {
  .level-item {
    div {
      justify-content: center;
    }
  }
}

.featured-post-button-wrapper {
  width: max-content;
}

.featured-post__button {
  display: block;
  padding: 0.7rem 2rem;
  background: $primary;
  border: 0;
  color: rgba(255, 255, 255, 0.973);
  font-size: 1rem;
  border-radius: 3px;
  // text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: 0.3s;
}

.featured-post__button:hover {
  background-color: darken($primary, 7%);
  transform: translateX(10px);
  color: #fff;
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


@media only screen and (min-width: 700px) {
  
  .featured-post__read-more {
    display: block;
  }

  // With image
  .featured-post-image {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
    grid-column-gap: 50px;
    // grid-row-gap: 10px;

    .featured-post__image {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 4;
    }
  }

  // Without an image
  .featured-post {
    padding: 0;
    display: grid;
    max-width: 100%;
    grid-column-gap: 50px;
    grid-row-gap: 30px;
    // grid-row-gap: 10px;
    // width: 80%;
    // margin: 0 auto;
    margin: 0 auto;

    .my-featured-level {
      width: 100%;
    }
  }

}


@media only screen and (min-width: 770px) {

  .featured-post {
    .featured-post__title, .featured-post__subtitle {
      max-width: 80%;
    }
  }

  .featured-post__read-more {
    margin: 0;
  }
  .featured-post-tags {
    display: grid !important;
    margin: 0;
  }
}

@media only screen and (min-width: 1000px) {
  .featured-post-image {

  }

  .featured-post {
    padding: 0 3rem;
  }
}


@media only screen and (min-width: 1200px) {
  .featured-post-image {
    // padding: 3rem 1.5rem 6rem 1.5rem;
    display: grid;
    grid-column-gap: 70px !important;
    padding: 0;
  }

  .featured-post {
    // padding: 3rem 1.5rem 6rem 1.5rem;
    display: grid;
    grid-column-gap: 70px !important;
    padding: 0;
    margin: 0;


  }

  .read-more-btn {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 16px 45px;
  }
}

</style>