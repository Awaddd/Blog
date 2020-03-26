<template>
  <div>
    <section class="blogPost">
      <div class="has-text-centered">
        <h1 class="title is-3 is-size-4-mobile has-text-primary is-capitalized my-post-title">{{post.title}}</h1>
        <h3 class="subtitle is-size-5 is-size-6-mobile">{{post.summary}}</h3>

      </div>

      <div class="cover-image">
        <img :src="post.image" alt="">
      </div>

      <header class="level">
        <div class="my-author-details">
          <p class="title is-size-6 has-text-primary is-capitalized">{{post.author}}</p>
          <p class="subtitle is-size-6"><strong>{{formatDate(post.createdAt)}}</strong></p>
        </div>    
        <div class="level-right" v-if="post.tags">
          <div class="field is-grouped is-grouped-multiline" >
            <div class="control" v-for="(tag, i) in post.tags" :key="i">
              <div class="tags">
                <a class="tag is-link">{{tag}}</a>
              </div>
            </div>
          </div>
        </div>
      </header>



        

      <div class="content breakOffLongWords" v-html="post.content"></div>

    </section>

  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import Nav from "@/components/Nav.vue";
import moment from "moment";

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
      console.log(this.post.tags);
      console.log(this.post.createdAt);
    },
    formatDate(date) {
      return moment(date).format('MMMM Do, YYYY')
    }
  }
};
</script>


<style lang="scss" scoped>

@import "../styles/app.scss";

.my-post-title {
  font-weight: 600;
}

.my-author-details {
  padding: 1rem 0;
}

.blogPost {
  margin: 3rem 1.5rem;
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


@media only screen and (min-width: 700px) {
  .blogPost {
    width: 70%;
    margin: 5rem auto;
  }
  .level {
    display: grid;
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

  .level {
    display: flex;
  }

  .cover-image {
    max-height: 300px;
  img {
    margin-top: -150px;
  }
}

@media only screen and (min-width: 1600px) {
  .blogPost {
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
}

</style>

