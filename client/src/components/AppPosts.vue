<template>
  <div class="container">

    <p class="title is-size-5-mobile is-size-4 has-text-dark has-text-centered my-page-title">{{title}}</p>
    <app-posts-placeholder :showAmount="6" v-if="loading === true"></app-posts-placeholder>

    <div class="cards-wrapper my-container" v-else>
      <div class="card" v-for="(post, i) in posts.slice(0, showAmount)" :key="i">
        <router-link
        :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(post.title)}
          }">
          <div class="card-image">
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
      posts: []
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
      this.posts = response.data.posts;
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
</style>

