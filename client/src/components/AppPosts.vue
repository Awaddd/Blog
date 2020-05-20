<template>
  <div class="container">

    <p class="title is-size-5-mobile is-size-4 has-text-dark has-text-centered my-page-title">{{title}}</p>
    <app-posts-placeholder :showAmount="3" v-if="loading === true"></app-posts-placeholder>

    <div class="cards-wrapper my-container" v-else>
      <template v-for="(post, i) in posts.slice(0, showAmount)">

        <div class="card" :key="i" v-if="post.image">
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

        <div class="alt__card" :key="i" v-else>
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

      </template>

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
      posts: null
    };
  },
  mounted () {
    this.getPosts()
  },
  components: {
    "app-posts-placeholder": AppPostsPlaceholder
  },
  computed: {
    ...mapGetters({ 'loading': 'getLoadingPostsStatus' })
  },
  props: ['showAmount', 'title'],
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      response.data.posts.length > 0 ? this.posts = response.data.posts : this.posts = null;
      if (this.posts) this.$store.dispatch("SET_LOADING_POSTS_STATUS", false);
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

.card-image {
  
}

.alt__card {

}

.alt__card-content {
  
}


.alt__card--category{
  padding: 0.7rem 0.7rem;
  // background: #7878ff;
  // p {
  //   color: #fff;
  // }
}

.alt__card--title {
  margin-bottom: 0 !important;
}

.alt__card--content {
  // border-left: 5px solid rgba(0, 255, 0, 0.5);
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 10px;
}

.alt__card--tags {
}

.alt__card--read-more {
}


@media only screen and (min-width: 700px) {
  .alt__card {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-left: 3px solid $warning;
    border-right: 3px solid #fff;
    // border-top: 3px solid $warning;
    border-radius: 3px;
    min-height: 220px;
  }
}

</style>

