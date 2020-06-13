<template>
  <div class="blogPost-wrapper">
    <section class="blogPost" v-if="post">

      <div class="has-text-centered blogPost-header">
        <!-- <h1 class="title is-size-3  is-size-4-mobile  is-capitalized my-post-title">{{post.title}}</h1>
        <h3 class="subtitle is-size-5 is-size-6-mobile">{{post.summary}}</h3> -->
        <h1 class="title blogPost-header-title is-capitalized my-post-title">{{post.title}}</h1>
        <h3 class="subtitle blogPost-header-subtitle">{{post.summary}}</h3>
      </div>

      <div class="blogPost-image" v-if="(post) && (post.image)">
        <img :src="post.image" alt="">
      </div>

      <div class="blogPost-imageless" v-else></div>

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

    <AboutAuthor class="author-section" v-if="post" :authorID="post.authorID" />

    <div class="viewCommentsWrapper" v-if="!showComments">
      <b-button class="viewCommentsButton" type="is-danger"  outlined @click="getComments">View comments</b-button>
    </div>

    <Comments class="comments-section" :key="commentsKey" v-else />

  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import CommentsService from "@/services/CommentsService";
import AboutAuthor from "@/components/AboutAuthor.vue";
import Comments from "@/components/Comments.vue";
import { formatDate } from '@/helpers/helpers';
import { mapGetters } from 'vuex';

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
      showComments: false,
      commentsKey: 0
    }
  },
  mounted() {
    this.getPosts();
  },
  computed: {
    ...mapGetters(['getCommentAdded'])
  },
  watch: {
    'getCommentAdded': function () {
      console.log('comment added: ', this.getCommentAdded);
      this.getComments();
      this.commentsKey += 1;
      this.$store.dispatch("SET_COMMENT_ADDED", false);
    }
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
      if (response.status !== 200) console.log(response.data.message); 
      else if ((response.data) && (response.status === 200)) {
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
    async getReplies() {
      const response = await CommentsService.fetchReplies(this.discussionIDs);
      if (response.status !== 200) console.log('No Replies ', response.data); 
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

.blogPost-wrapper {
  margin-bottom: 2rem;
}

.blogPost {
  margin: 0 1.5rem;
  line-height: 1.5;
  padding: 2rem 0;
}

.blogPost-header {
  margin: 0 0 2rem 0;
}

.blogPost-header-title {
  color: #363636;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.125;
}

.blogPost-header-subtitle{
  color: #4a4a4a;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
}

.blogPost-image {
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
}

.viewCommentsWrapper {
  padding: 0 1.5rem;
  display: grid;
  justify-items: center;
}

.author-section {
  padding: 1rem 1.5rem;
}

.comments-section {
  margin: 3rem 0;
}


@media only screen and (min-width: 360px) {

  .blogPost {
    padding: 2rem 1rem;
  }
  .author-section, .viewCommentsWrapper {
    padding: 1rem 2.2rem;
  }

}

@media only screen and (min-width: 600px) {

  .blogPost-wrapper {
    width: 90%;
    margin: 0 auto;
  }
  .blogPost-image {
    img {
      height: 200px;
    }
  }

}

@media only screen and (min-width: 700px) {
  .blogPost-wrapper {
    width: 90%;
    padding: 1.5rem;
  }
  .level {
    display: block;
  }
  .level-right {
    justify-content: flex-start;
  }

  .author-section, .viewCommentsWrapper {
    padding: 0 2.5rem;
    margin: 3rem 0;
  }
}

@media only screen and (min-width: 850px) {
  .level {
    display: flex;
  }
}

@media only screen and (min-width: 1000px) {

  .blogPost-wrapper {
    padding: 3rem 1.5rem;
  }
  
  .blogPost-header {
    margin: 0 0 2rem 0;
  }

  
  .blogPost-header-title {
    font-size: 1.8rem;
  }

  .blogPost-header-subtitle{
    font-size: 1.125rem;
  }

  .blogPost-image {
    img {
      height: 250px;
    }
  }

}

@media only screen and (min-width: 1200px) {
    
  .blogPost-header-subtitle{
    font-size: 1.25rem;
  }

  .blogPost-wrapper {
    width: 70%;
  }
  .level {
    display: flex;
  }


}

@media only screen and (min-width: 1600px) {
  .blogPost-wrapper {
    width: 50%;
    margin: 0 auto;
  }

  .blogPost-image {
    img {
      height: 300px;
    }
  }

  .my-post-title {
    max-width: 95%;
    margin: 0 auto;
  }
}

</style>

