<template>
  <div class="">
    <div class v-for="(post, i) in posts" :key="i">
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

          <p>{{post.summary}}</p>
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
.read-more {
  cursor: pointer;
}

.postTitle {
  text-transform: capitalize;
  font-size: 1.2rem;
}
</style>

