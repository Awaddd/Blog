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
          <h4 class="postTitle">{{post.title}}</h4>

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

.read-more {
  cursor: pointer;
}

.card {
  cursor: pointer;
}

.postTitle {
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: $font-bold;
}

.summary {
  font-size: 1.1rem;
  font-weight: $font-md;
}

.blogPost-details {
  font-size: 0.85rem;
  font-weight: $font-thin;
}
</style>

