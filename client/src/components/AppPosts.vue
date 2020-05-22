<template>
  <div  class="container" v-if="isEmpty === true">

    <p class="title is-size-5-mobile is-size-4 has-text-dark has-text-centered my-page-title is-capitalized">{{title}}</p>
    <div class="has-text-centered">

      <h1 class="is-size-6-mobile is-size-5 has-text-weight-normal">No {{$route.params.plural}} at the moment. Check out the other categories!</h1>

      <figure class="image posts__category--empty">
        <img src="../assets/empty.svg" alt="">
      </figure>
    </div>
  </div>

  <div class="container" v-else>
    <p class="title is-size-5-mobile is-size-4 has-text-dark has-text-centered my-page-title is-capitalized">{{title}}</p>
    <app-posts-placeholder :showAmount="3" v-if="loading === true"></app-posts-placeholder>

    <div class="" v-else>
      <div class="cards-wrapper my-container">
        <div class="card" :key="i" v-for="(post, i) in postsWithMedia.slice(0, showAmount)">
          <router-link
          :to="{
                name: 'BlogPost',
                params: {title: sanitizeTitle(post.title)}
            }">
            <div class="card-image" v-if="post.image">
              <figure class="image is-5by3">
                <img :src="post.image" alt="" class="">
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-6 is-capitalized">{{post.title}}</p>
              <div class="content">
                
                <p class="">{{sanitizeSummary(post)}}</p>
                <p class="has-text-primary">Read More...</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="cards-wrapper my-container">
        <div class="alt__card" :key="i" v-for="(post, i) in postsWithoutMedia.slice(0, showAmount)">
          <router-link
          :to="{
                name: 'BlogPost',
                params: {title: sanitizeTitle(post.title)}
            }">
            <div class="alt__card--wrapper">

              <div class="alt__card--content">
                <p class="alt__card--title title is-6 is-capitalized">{{post.title}}</p>
                <p class="">{{sanitizeSummary(post)}}</p>


                <div class="control">
                  <div class="tags">
                    <b-tag ellipsis type="is-warning">{{post.category.name}}</b-tag>
                  </div>
                </div>

                <p class="has-text-primary alt__card--read-more">Read More...</p>
              </div>
              
            </div>
          </router-link>
        </div>
      </div>


    </div>


  </div>

</template>

<script>
import AppPostsPlaceholder from '@/components/placeholders/AppPostsPlaceholder.vue'
import PostsService from "@/services/PostsService";
import { sanitizeTitle } from '@/helpers/helpers';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      posts: null,
      postsWithMedia: [],
      postsWithoutMedia: [],
      isEmpty: false
    };
  },
  mounted () {
    this.loadContent();
  },
  watch: {
    '$route.params.plural': function () {
      this.loadContent();
    }
  },
  components: {
    "app-posts-placeholder": AppPostsPlaceholder
  },
  computed: {
    ...mapGetters({ 'loading': 'getLoadingPostsStatus' })
  },
  props: ['showAmount', 'title'],
  methods: {
    async loadContent () {
      this.posts = null;
      this.postsWithMedia = [];
      this.postsWithoutMedia = [];
      console.log(this.$route.params.plural);
      if (this.$route.params.plural) await this.getPostsByCategory();
      else await this.getPosts();
      if (this.posts === null) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    },
    handleSuccess() {
      // handle success for the retrieve post methods
      this.$store.dispatch("SET_LOADING_POSTS_STATUS", false);
      this.posts.forEach( i => {
        if (i.category.hasMedia === true) this.postsWithMedia.push(i);
        else this.postsWithoutMedia.push(i);
      })

    },
    async getPosts() {
      // get all posts and display media content on different rows from content without media
      // used for the homepage
      const response = await PostsService.fetchPosts();
      response.data.posts.length > 0 ? this.posts = response.data.posts : this.posts = null;
      if (this.posts) this.handleSuccess();
    },
    async getPostsByCategory() {
      // get posts for a specific category, used for each category's page.
      const response = await PostsService.fetchPostsByCategory(this.$route.params.plural);
      response.data.posts.length > 0 ? this.posts = response.data.posts : this.posts = null;
      if (this.posts) this.handleSuccess();
    },
    sanitizeTitle (title) {
      return sanitizeTitle(title);
    },
    sanitizeSummary (post) {
      if (post.summary) {
        let length = 100;
        let summary = post.summary;
        if (summary.length > length) return summary + '...';
        return summary;
      } 
    }
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.cards-wrapper {
  a {
    color: #333;
  }
  a:hover{
    color: #333;
  }
}

.posts__category--empty {
  margin: 2rem auto;
  max-width: 300px;
}

.card-image {
  
}

.alt__card {
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      border-left: 3px solid $warning;
    border-right: 3px solid #fff;
}

.alt__card--category{
  padding: 0.7rem 0.7rem;
}

.alt__card--title {
  margin-bottom: 0 !important;
}

.alt__card--content {
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 10px;
}


@media only screen and (min-width: 700px) {
  .alt__card {
    min-height: 220px;
  }
}

</style>

