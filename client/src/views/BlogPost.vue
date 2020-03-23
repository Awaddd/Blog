<template>
  <div>
    <section class="blogPost">
      <div class="blogPost-wrapper">
        <h1 class="blogPost-title">{{post.title}}</h1>
        <div class="blogPost-summary">
          <h3 class="summary hug">{{post.summary}}</h3>
        </div>

      </div>

      <div class="cover-image">
        <img :src="post.image" alt="">
      </div>
             <div class="blogPost-details">
          <p class="author">Umar Dini</p>
          <p class="date">July 3rd, 2018</p>
        </div>

      <div class="blogPost-content" v-html="post.content"></div>

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

@import "../styles/app.scss";

.blogPost {
  margin: 1.5rem;
  line-height: 1.5;
}

.blogPost-wrapper {
  text-align: center;
}

.cover-image {
    margin: 2rem 0 0 0;
    max-height: 200px;
    max-width: 1200px;
    overflow: hidden;
  img {
    min-width: 100%;
    max-width: 100%;
    margin-top: -50px;
  }
}

.blogPost-title {
  // text-align: center;
  text-transform: capitalize;
  font-weight: 400;
  // font-size: 1.8rem;
  margin: 1rem 0;
  color: #09f;
}

.blogPost-details {
  // background: red;
  display: grid;
  grid-template-rows: max-content;
  margin: 0 auto 2rem auto;
  text-align: left;
  // width: max-content;
}

.author,
.date {
  margin: 0;
  font-size: 0.9rem;
  // justify-self: end;
}
.author {
  margin-top: 1rem;
  color: $primary;
}

.blogPost-content p {
  margin: 0;
}


@media only screen and (min-width: 700px) {
  .blogPost {
    width: 50%;
    margin: 3rem auto;
  }

  .blogPost-title {
    font-size: 2rem;
    margin: 0 auto 0 auto;
  }

  .blogPost-summary {
    .summary {
      font-weight: $font-md;
      font-size: 1rem;
    }
  }

  .cover-image {
    img {
      margin-top: -160px;
    }
}
}

@media only screen and (min-width: 1000px) {
  .cover-image {
    img {
      margin-top: -250px;
    }
  }
}

@media only screen and (min-width: 1200px) {
  .blogPost {
    // width: 37%;
    width: 50%;
    margin: 5rem auto;
  }
  .cover-image {
    max-height: 300px;
  img {
    margin-top: -150px;
  }
}
}

</style>

