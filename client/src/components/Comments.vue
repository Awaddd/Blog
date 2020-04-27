<template>
  <div class="comments-section">

    <div class="comments-section-title">
      <h2 class="title is-size-5">Comments</h2>
      <hr class="subtitle">
    </div>

    <addComment />

    <div>
      <div v-for="(comment, i) in getComments.comments" :key="i">
        <article class="comment-wrapper">
          <figure class="media-left">
              <img class="circle-picture image is-64x64" src="https://bulma.io/images/placeholders/128x128.png" />
          </figure>
          <div>
             <strong class="is-capitalized">{{comment.author.firstName}} {{comment.author.lastName}}</strong>

             <p>{{comment.content}}</p>

              <div class="comments-section-comment-controls">
                <div class="icon-button">

                  <div>
                    <span style="margin-right: 10px; font-weight: 600;">13</span>
                    <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
                  </div>

                  <!-- <div>
                    <span style="margin-right: 10px; font-weight: 600;">13</span>
                    <b-icon icon="heart" type="is-danger" size="is-small" class="heart"></b-icon>
                  </div> -->

                </div>
                
                <div @click="reply(i)" class="icon-button">
                  <b-icon icon="reply" size="is-small" type="reply"></b-icon>
                </div>
                <span> 2 hrs ago</span>
              </div>
              <span tag="button" class="add-comment-view-more" @click="showReplies(i)" v-if="!showHideReplies">  
                <b-icon icon="chevron-down"></b-icon>
                View replies
              </span>

              <span tag="button" class="add-comment-view-more" @click="hideReplies(i)" v-if="showHideReplies && (parentCommentID === comment._id)">  
                <b-icon icon="chevron-up"></b-icon>
                Close
              </span>
          </div>

          <div class="add-comment-reply-wrapper" v-if="isReply && (parentCommentID === comment._id)">
            <AddComment class="add-comment-reply" :discussion="comment.discussion_id" :replyingTo="comment._id" />
          </div>

          <div class="add-comment-reply-wrapper" v-if="replies && (parentCommentID === comment._id)">
            <div v-for="(reply, k) in replies.comments" :key="k">

              <article class="comment-wrapper">
                <figure class="media-left">
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
                    <div class="icon-button">
                      <div >
                        <span style="margin-right: 10px; font-weight: 600;">13</span>
                        <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
                      </div>
                    </div>
                    <span> 2 hrs ago</span>
                  </div>
                </div>

              </article> 
            </div>
          </div>

          
        </article>
      </div>
    </div>

  </div>
</template>


<script>
import AddComment from "@/components/comments/AddComment.vue";
import CommentsService from "@/services/CommentsService";
import { mapGetters } from 'vuex';
import moment from "moment";

export default {
  components: {
    AddComment
  },
  computed: {
    ...mapGetters(['getComments'])
  },
  data () {
    return {
      replies: null,
      parentCommentID: null,
      isReply: null,
      showHideReplies: null
    }
  },
  methods: {
    showReplies (i) {
      this.getReplies(i);
      this.showHideReplies = !this.showHideReplies
    },
    hideReplies (i) {
      this.showHideReplies = null;
      this.replies = null;
    },
    async getReplies(i) {
      // this.replyingTo = this.getComments.comments[comment]._id;
      console.log(this.getComments.comments[i].discussion_id);
      console.log(this.getComments.comments[i].content);

      const response = await CommentsService.fetchReplies(this.getComments.comments[i].discussion_id);
      if (response.data.success === false) console.log(response.data.message); 
      else if (response.data && response.status === 200) {
        this.replies = response.data;
        console.log(this.replies);
        this.parentCommentID = this.getComments.comments[i]._id;
      }
    },
    reply(i) {
      this.isReply = !this.isReply;
    }
  }
}
</script>

<style lang="scss">

.comments-section {
  margin-top: 3rem;
}

.comment-wrapper {
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: max-content 1fr;
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

.add-comment-view-more {
  display: grid; 
  grid-template-columns: max-content max-content; 
  grid-gap: 5px;
  cursor: pointer;
}

.add-comment-reply-wrapper {
  grid-column: 1/4;
}

.add-comment-reply {
  margin-bottom: 3rem;
}


@media only screen and (min-width: 770px) {

  .add-comment-reply-wrapper {
    display: grid;
    grid-column: 2/4;
  }
  .add-comment-reply {
    display: grid;
  }
}

</style>