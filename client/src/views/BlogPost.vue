<template>
  <div>
    <!-- <img class="coverImage"> -->
    <header>
      <app-nav></app-nav>
    </header>

    <section class="blogPost">
      <h3 class="blogPost-title">{{post.title}}</h3>
      <div class="blogPost-details">
        <p class="author">By Umar Dini</p>
        <p class="date">July 3rd, 2018</p>
      </div>
      <div class="blogPost-content" v-html="post.content">
      </div>
    </section>

  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import Nav from "@/components/Nav.vue";

export default {
  data() {
    return {
      post: []
    };
  },
  components: {
    "app-nav": Nav
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


<style lang="scss">

.blogPost {
  margin: 3rem 1.5rem;
  line-height: 1.5;
}

.blogPost-title {
  // text-align: center;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1.5rem;
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

.blogPost-content p {
  margin: 0;
}


@media only screen and (min-width: 700px) {
  .blogPost {
    margin: 3rem;
  }

  .blogPost-title {
    font-size: 2.4rem;
    margin: 2rem auto 1rem auto;
  }
}

@media only screen and (min-width: 1200px) {
  .blogPost {
    width: 50%;
    margin: 5rem auto;
  }
}

</style>

