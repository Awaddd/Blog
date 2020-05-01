<template>
  <div class="blogPost-wrapper">
    <section class="blogPost" v-if="post">
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
    </section>

    <AboutAuthor />

    <div class="viewCommentsWrapper" v-if="!showComments">
      <b-button class="viewCommentsButton" type="is-danger" outlined @click="getComments">View comments</b-button>
    </div>

    <Comments class="comments-section" v-else />

  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import CommentsService from "@/services/CommentsService";
import AboutAuthor from "@/components/AboutAuthor.vue";
import Comments from "@/components/Comments.vue";
import { formatDate } from '@/helpers/helpers';

export default {
  components: {
    AboutAuthor,
    Comments
  },
  data() {
    return {
      post: null,
      comments: null,
      discussionIDs: null,
      replies: null,
      showComments: false
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
        this.$store.dispatch('SET_CURRENT_POST', { title: this.$route.params.title, id: this.post._id });
        this.$store.dispatch('SET_COMMENTS', null);
        this.$store.dispatch('SET_REPLIES', null);
      };
    },
    async getComments() {
      this.showComments = true;
      const response = await CommentsService.fetchComments(this.post._id);
      if (response.data.success === false) console.log(response.data.message); 
      else if (response.data && response.status === 200) {
        this.comments = response.data;

        this.discussionIDs = [];
        this.comments.forEach( item => {
          console.log(item.discussion_id);
          this.discussionIDs.push(item.discussion_id);
        });

        console.log(this.discussionIDs);

        this.getReplies();

        this.$store.dispatch('SET_COMMENTS', response.data);
        console.log(response.data);
      };
    },
    async getReplies(i) {
      console.log('-----------------');

      const response = await CommentsService.fetchReplies(this.discussionIDs);
      if (response.status !== 200) console.log(response.data); 
      else if (response.data && response.status === 200) {
        this.replies = response.data;
        this.$store.dispatch('SET_REPLIES', response.data);
        console.log(this.replies);
      }
    },
    formatDate(date) {
      return formatDate(date);
    }
  }
};
</script>


<style lang="scss" scoped>

@import "../styles/app.scss";

.blogPost-separator {
  width: 100%;
  border-bottom: 5px solid rgba(250, 250, 250, 0.5);
}

.my-post-title {
  font-weight: 600;
}

.my-author-details {
  padding: 1rem 0;
}

.blogPost {
  margin: 0 1.5rem;
  line-height: 1.5;
  padding: 2rem 0;
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

.viewCommentsWrapper {
  margin: 2rem 0;
  display: grid;
  justify-items: center;
}

.comments-section {
  margin: 3rem 0;
}

@media only screen and (min-width: 360px) {
  .blogPost {
    padding: 2rem 1rem;
  }
}

@media only screen and (min-width: 700px) {
  .blogPost-wrapper {
    width: 70%;
    margin: 0 auto;
    padding: 3rem 1.5rem;
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
  .blogPost-wrapper {
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

