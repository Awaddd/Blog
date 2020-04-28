<template>
  <div class="comments-section">

    <div class="comments-section-title">
      <h2 class="title is-size-5">Comments</h2>
      <hr class="subtitle">
    </div>

    <addComment />

    <div>
      <div v-for="(comment, i) in comments" :key="i">
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
              <span tag="button" class="add-comment-view-more" v-if="showHideOpenRepliesButton(comment)" @click="getReplies(i)">  
                <b-icon icon="chevron-down"></b-icon>
                View replies
              </span>

              <span tag="button" class="add-comment-view-more" v-if="showHideCloseRepliesButton(comment, currentReply)" @click="hideReplies(comment, currentReply)">  
                <b-icon icon="chevron-up"></b-icon>
                Close
              </span>
          </div>

          <div class="add-comment-reply-wrapper" v-if="isReply">
            <AddComment class="add-comment-reply" :discussion="comment.discussion_id" :replyingTo="comment._id" />
          </div>
<!-- (parentDiscussionID === comment.discussion_id)
(parentCommentID === comment._id)
 -->
          <!-- REPLIES -->
          <div class="add-comment-reply-wrapper" v-if="showReplies(comment, currentReply)">
            <div v-for="(reply, k) in replies" :key="k">

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
    ...mapGetters({ comments: 'getComments' })
  },
  data () {
    return {
      replies: null,
      copyOfReplies: [],
      isReply: null,
      currentReply: null,
      currentOpenRepliesButton: true
    }
  },
  methods: {
    async getReplies(i) {
      console.log('-----------------');

      const response = await CommentsService.fetchReplies(this.comments[i].discussion_id);
      if (response.status !== 200) console.log(response.data); 
      else if (response.data && response.status === 200) {
        this.replies = response.data;
        this.copyOfReplies.push(this.replies);
        console.log(this.copyOfReplies);
        this.currentReply = {
          _id: this.comments[i]._id,
          discussion_id: this.comments[i].discussion_id
        };
        console.log(this.replies);
      }
    },
    reply(i) {
      this.isReply = !this.isReply;
    },
    showReplies(comment, reply) {
      if (this.replies && (comment._id === reply._id)) return true;
      return false;
    },
    hideReplies(comment, reply) {
      if (this.replies && (comment._id === reply._id)) { 
        this.replies = null; 
        this.openRepliesButton = true;
      }
    },
    showHideOpenRepliesButton(comment) {
      if (this.currentReply) {
        if (comment._id === this.currentReply._id) {
          console.log(comment);
          return false;
        }
        return true;
      } else return true;
    },
    showHideCloseRepliesButton(comment, reply) {
      if (this.replies && (comment._id === reply._id)) {
        return true;
      }
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