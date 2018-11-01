<template>
  <div class="cards-wrapper">
    <div class="card" v-for="(post, i) in posts" :key="i">
        <!-- post in posts.slice(0, 4) -->
        <div>
          <h4 class="primary-text">{{post.title}}</h4>
        </div>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, est?</p>

        <router-link class="btn" :to="{
            name: 'BlogPost',
            params: {title: sanitizeTitle(post)}
        }">
          Read more...
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
.read-more {
  cursor: pointer;
}
</style>

