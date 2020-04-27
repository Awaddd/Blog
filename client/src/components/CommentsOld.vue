<template>
  <div class="comments-section">
    <div class="comments-section-title">
      <h2 class="title is-size-5">Comments</h2>
      <hr class="subtitle">
    </div>
    <!-- <div class="comments-section-loadmore" v-if="!commentsExist">
      <b-button type="is-primary" expanded outlined @click="loadComments(5)">Load Comments (60)</b-button>
    </div> -->
    <div class="comments-section-wrapper">

      <AddComment />

      <div class="comments-section-comment">
        <div v-for="(comment, i) in getComments.comments" :key="i">
          <!-- <Comment :comment="comment" /> -->

          <article class="comment-wrapper parent-comment-wrapper">
            <figure class="media-left">
                <!-- <img class="circle-picture image is-64x64" :src="comment.image"> -->
                <img class="circle-picture image is-64x64" src="https://bulma.io/images/placeholders/128x128.png" />
            </figure>
            <div>
              <strong class="is-capitalized">{{comment.author.firstName}} {{comment.author.lastName}}</strong>
              <br>
              <!-- <p class="comments-section-comment-reply">
                <b-icon icon="reply" type="is-primary"></b-icon>
                <span>Replying to John Smith</span>
              </p> -->
              {{comment.content}}
              <br>
              <div class="comments-section-comment-controls">
                <div @click="favourite" class="icon-button">
                  <div v-if="!isFavourite" >
                    <span style="margin-right: 10px; font-weight: 600;">13</span>
                    <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
                  </div>
                  <div v-else>
                    <span style="margin-right: 10px; font-weight: 600;">13</span>
                    <b-icon icon="heart" type="is-danger" size="is-small" class="heart"></b-icon>
                  </div>
                </div>
                
                <div @click="reply(i)" class="icon-button">
                  <b-icon icon="reply" size="is-small" type="reply"></b-icon>
                </div>
                <span>{{formatDate(comment.createdAt)}}</span>
                <!-- <span> 2 hrs ago</span> -->
              </div>
              <span tag="button" class="add-comment-view-more" v-if="!isReply && !replies" @click="getReplies(i)">  
                <b-icon icon="chevron-down"></b-icon>
                View replies
              </span>
              <span tag="button" class="add-comment-view-more" v-else @click="closeReplies">  
                <b-icon icon="chevron-up"></b-icon>
                Close
              </span>
            </div>

            <div class="add-comment-reply-wrapper" v-if="isReply && (replyingTo === comment._id)" >
              <AddComment class="add-comment-reply" :discussion="comment.discussion_id" :replyingTo="comment._id" />
            </div>

<!-- REPLY START -->
            <div v-if="replies && (replyingTo === comment._id)" class="add-comment-reply-wrapper">
              <div v-for="(reply, i) in replies.comments" :key="i">

                <article class="comment-wrapper">
                  <figure class="media-left">
                      <!-- <img class="circle-picture image is-64x64" :src="comment.image"> -->
                      <img class="circle-picture image is-64x64" src="https://bulma.io/images/placeholders/128x128.png" />
                  </figure>
                  <div>
                    <strong class="is-capitalized">{{reply.author.firstName}} {{reply.author.lastName}}</strong>
                    <br>
                    <p class="comments-section-comment-reply">
                      <b-icon icon="reply" type="is-primary"></b-icon>
                      <span>Replying to {{comment.author.firstName}} {{comment.author.lastName}}</span>
                    </p>
                    {{reply.content}}
                    <br>
                    <div class="comments-section-comment-controls">
                      <div @click="favourite" class="icon-button">
                        <div v-if="!isFavourite" >
                          <span style="margin-right: 10px; font-weight: 600;">13</span>
                          <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
                        </div>
                        <div v-else>
                          <span style="margin-right: 10px; font-weight: 600;">13</span>
                          <b-icon icon="heart" type="is-danger" size="is-small" class="heart"></b-icon>
                        </div>
                      </div>
                      <span>{{formatDate(reply.createdAt)}}</span>
                      <!-- <span> 2 hrs ago</span> -->
                    </div>
                  </div>

                </article> 
              </div>
            </div>
<!-- REPLY END -->

          </article> 
        </div> 
      </div>
      
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comments/Comment.vue";
import AddComment from "@/components/comments/AddComment.vue";
import CommentsService from "@/services/CommentsService";
import { mapGetters } from 'vuex';
import { formatDate } from '@/helpers/helpers';

export default {
  components: {
    Comment,
    AddComment
  },
  computed: {
    ...mapGetters(['getComments'])
  },
  mounted () {
    console.log(this.getComments.comments[0].author);
  },
  data () {
    return {
      replies: null,
      isReply: null,
      replyingTo: null,
      isFavourite: false
    }
  },
  methods: {
    async getReplies(comment) {
      this.replyingTo = this.getComments.comments[comment]._id;
      console.log(this.getComments.comments[comment].discussion_id);
      console.log(this.getComments.comments[comment].content);

      const response = await CommentsService.fetchReplies(this.getComments.comments[comment].discussion_id);
      if (response.data.success === false) console.log(response.data.message); 
      else if (response.data && response.status === 200) {
        this.replies = response.data;
        console.log(this.replies);
      };
    },
    closeReplies () {
      this.replies = null;
    },
    loadComments(numOfComments) {
      this.commentsExist = true;
      this.numOfComments = numOfComments;
      console.log(this.commentsExist);
      console.log(this.numOfComments);
    },
    reply(comment) {
      console.log(this.getComments.comments[comment]);
      this.replyingTo = this.getComments.comments[comment]._id;
      this.isReply = !this.isReply;
    },
    favourite () {
      this.isFavourite = !this.isFavourite;
    },
    formatDate(date) {
      return formatDate(date);
    }
  }
}
</script>

<style lang="scss">

.comments-section {
  margin-top: 3rem;
}

.comments-section-loadmore {
  padding: 3rem 0;
  display: grid;
  justify-items: center;
}

.comments-section-wrapper{
  padding: 3rem 0;
}

.parent-comment-wrapper {
  background: #d8f1ff;
  margin-top: 5px;
}

.comments-section-comment {
  margin-top: 3rem;
}

.comments-section-comment-reply {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, max-content);
  padding: 1rem 0;
}

.comments-section-comment-controls {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-gap: 10px;
  padding: 1rem 0;
}

.comments-section-title {
  display: grid;
  justify-items: center;
}

@media only screen and (width: 770px) {
  .comments-section {
    margin-top: 3rem;
  }

  .comments-section-wrapper {
    margin-top: 3rem;
  }
}

</style>