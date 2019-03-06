<template>
  <div class="blogPost">
    <!-- <img class="coverImage"> -->
    <h3 class="blogPost-title">{{post.title}}</h3>
    <div class="blogPost-details">
      <p class="author">By Umar Dini</p>
      <p class="date">July 3rd, 2018</p>
    </div>
    <div class="blogPost-content" v-html="post.content"></div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";

export default {
  data() {
    return {
      post: []
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchSinglePost({
        title: this.$route.params.title
      });
      this.post = response.data;
      console.log(response.data);
      console.log(this.$route.params.title);
    }
  }
};
</script>


<style lang="scss" scoped>
.blogPost {
  margin: 2rem;
  line-height: 1.5;
}

.blogPost-title {
  // text-align: center;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 2.4rem;
  margin: 0 0 1rem 0;
}

.blogPost-details {
  display: grid;
  grid-template-rows: max-content;
  margin: 0 auto 2rem auto;
  // width: max-content;
}

.author,
.date {
  margin: 0;
  // justify-self: end;
}

.blogPost-content {
  padding: 0;
  margin: 0;
}

@media only screen and (min-width: 700px) {
  // .blogPost {
  //   margin: 3rem auto;
  //   width: 500px;
  // }

  // .blogPost-title {
  //   // font-size: 3rem;
  //   margin: 2rem auto 1rem auto;
  // }
}

// @media only screen and (min-width: 1200px) {
//   .blogPost {
//     width: 1000px;
//     margin: 0 auto;
//   }
// }
</style>

