<template>
  <div class="cards-wrapper">
    <div class="card" v-if="posts.length == 0">Loading</div>

    <div class="card" v-for="(post, i) in posts" :key="i">
      <!-- post in posts.slice(0, 4) -->
      <router-link
        class="btn"
        :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(post)}
          }"
      >
        <img
          src="https://www.gitschberg-jochtal.com/media/8f17c2b0-12de-4e98-bad3-622f96d1a64e/340_x_250/p=5/alpenhof-winter-340x250.jpg"
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

