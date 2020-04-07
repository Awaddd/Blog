<template>
  <div class="cards-wrapper my-container">

      <div class="card" v-for="(post, i) in posts.slice(0, showAmount)" :key="i">
        <router-link
        :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(post.title)}
          }">
          <div class="card-image">
            <figure class="image is-4by4">
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
</template>

<script>
import PostsService from "@/services/PostsService";
import { sanitizeTitle } from '@/helpers/helpers';

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPosts();
  },
  props: ['showAmount'],
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
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
</style>

