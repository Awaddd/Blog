<template>
  <div>
    <section class="blogPost section" v-if="post">
      <div class="has-text-centered">
        <h1 class="title is-size-3  is-size-4-mobile  is-capitalized my-post-title">{{post.title}}</h1>
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
                <!-- <a class="tag is-link ">{{tag}}</a> -->
                <b-tag ellipsis>{{tag}}</b-tag>
              </div>
            </div>
          </div>
        </div>
      </header>      

      <div class="content breakOffLongWords" v-html="post.content"></div>

      

      <AboutAuthor />
      <Comments />

    </section>

  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import AboutAuthor from "@/components/AboutAuthor.vue";
import Comments from "@/components/Comments.vue";
import moment from "moment";
import { formatDate } from '@/helpers/helpers';

export default {
  components: {
    AboutAuthor,
    Comments
  },
  data() {
    return {
      post: null
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchSinglePost({
        title: this.$route.params.title
      });
      console.log(response);
      if (response.data.success === false) {
        console.log(response.data.message); 
        this.$router.push('/404');
      }  
      else if (response.data && response.status === 200) {
        this.post = response.data;
      };
    },
    formatDate(date) {
      return formatDate(date);
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
  margin: 0 1.5rem;
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
    margin: 0 auto;
  }
  .level {
    display: block;
  }
  .level-right {
    justify-content: flex-start;
  }
}

@media only screen and (min-width: 850px) {
  .level {
    display: flex;
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
    margin: 0 auto;
  }
  .cover-image {
    max-height: 300px;
      img {
        margin-top: -150px;
      }
    }
  }
  .my-post-title {
    max-width: 95%;
    margin: 0 auto;
  }
}

</style>

