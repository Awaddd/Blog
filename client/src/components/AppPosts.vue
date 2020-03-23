<template>
  <div class="cards-wrapper my-container">

      <div class="card" v-for="(post, i) in posts" :key="i">
        <router-link
        :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(post)}
          }">
          <div class="card-image">
            <figure class="image is-4by4">
              <img :src="post.image" alt="" class="">
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-6 is-capitalized">{{post.title}}</p>
            <div class="content">
              {{sanitizeSummary(post)}}
              <br>
            </div>
          </div>
        </router-link>
      </div>
    
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPosts();
  },
  computed: {
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
      console.log(this.posts);
    },
    sanitizeTitle: function(post) {
      console.log(post.title);
      const title = post.title.replace(/\s+/g, "-").toLowerCase();
      return title;
    },
    sanitizeSummary: function(post) {
      if (post.summary) {
        console.log(post.summary);
        console.log(post.title + ': ' + post.title.length);
        let length = 100;
        let summary = post.summary.substring(0, length);
        return summary + '...';
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

