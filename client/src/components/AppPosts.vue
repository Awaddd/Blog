<template>
  <div class="panel-wrapper">
    <div class="card" v-for="(post, i) in posts" :key="i">
      <!-- post in posts.slice(0, 4) -->
      <router-link
        class="btn"
        :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(post)}
          }"
      >
        <div class="card-content">
          <h3 class="postTitle">{{post.title}}</h3>

          <p class="summary">{{post.summary}}</p>
          <div class="blogPost-details">
            <p class="author">By Umar Dini</p>
            <p class="date">July 3rd, 2018</p>
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
  computed: {},
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
    },
    sanitizeTitle: function(post) {
      console.log(post.title);
      const title = post.title.replace(/\s+/g, "-").toLowerCase();
      return title;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";


.postTitle {
  text-transform: capitalize;
  // font-weight: $font-bold;
}

.summary {
  // font-weight: $font-md;
}

.blogPost-details {
  // font-weight: $font-md;
}
</style>

