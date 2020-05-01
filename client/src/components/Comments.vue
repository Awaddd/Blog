<template>
  <div class="comments-section">

    <addComment />

    <div class="comments-section-wrapper">
      <div v-for="(comment, i) in comments" :key="i" class="comment-wrapper-parent">
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
              <span tag="button" class="add-comment-view-more" v-if="showHideOpenRepliesButton(comment, i)" @click="viewReplies(comment, i)">  
                <b-icon icon="chevron-down"></b-icon>
                View replies
              </span>

              <span tag="button" class="add-comment-view-more" v-if="showHideCloseRepliesButton(comment, i)" @click="hideReplies(comment, i)">  
                <b-icon icon="chevron-up"></b-icon>
                Close
              </span>
          </div>

          <div class="add-comment-reply-wrapper" v-if="isReply">
            <AddComment class="add-comment-reply" :discussion="comment.discussion_id" :replyingTo="comment._id" />
          </div>

          <!-- REPLIES -->
          <div class="add-comment-reply-wrapper" v-if="showReplies(comment, i)">
            <div v-for="(reply, k) in replies" :key="k" class="comment-wrapper-child">

              <article class="comment-wrapper">
                <figure class="media-left">
                    <img class="circle-picture image is-64x64" src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>
                <div>
                  <strong class="is-capitalized">{{reply.author.firstName}} {{reply.author.lastName}}</strong>
                  <br>
                  <!-- <p class="comments-section-comment-reply">
                    <b-icon icon="reply" type="is-primary"></b-icon>
                    <span>Replying to {{comment.author.firstName}}</span>
                  </p> -->
                  <p> <span class="has-text-primary">@{{comment.author.firstName}}</span> {{reply.content}} </p>
                  <!-- <div class="comments-section-comment-controls">
                    <div class="icon-button">
                      <div >
                        <span style="margin-right: 10px; font-weight: 600;">13</span>
                        <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
                      </div>
                    </div>
                    <span> 2 hrs ago</span>
                  </div> -->

                  <div class="comments-section-comment-controls">
                    <div class="icon-button">

                      <div>
                        <span style="margin-right: 10px; font-weight: 600;">13</span>
                        <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
                      </div>

                    </div>
                    <div @click="reply(i)" class="icon-button">
                      <b-icon icon="reply" size="is-small" type="reply"></b-icon>
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
    ...mapGetters({ comments: 'getComments', allReplies: 'getReplies' }),
  },
  data () {
    return {
      replies: null,
      isReply: null,
      currentReply: null
    }
  },
  mounted () {
    this.renderCorrectly();
  },
  methods: {
    renderCorrectly() {
      console.log('TOP WAFF');
    },
    viewReplies(comment, i) {
      this.currentReply = {
        _id: this.comments[i]._id,
        discussion_id: this.comments[i].discussion_id
      };

      this.replies = [];

      this.allReplies.forEach(item => {
      if (comment.discussion_id === item.discussion_id) {
          this.replies.push(item);
        }
      });
    },
    reply(i) {
      this.isReply = !this.isReply;
    },
    showReplies(comment, reply) {
      if ((this.replies) && (comment._id === this.currentReply._id)) return true;
      return false;
    },
    hideReplies(comment, reply) {
      if (this.replies && (comment._id === this.currentReply._id)) { 
        this.replies = null; 
        this.openRepliesButton = true;
      }
    },
    showHideOpenRepliesButton(comment, reply) {
      if (this.replies && (comment._id === this.currentReply._id)) {
        return false;
      } else return true;
    },
    showHideCloseRepliesButton(comment, reply) {
      if (this.replies && (comment._id === this.currentReply._id)) {
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

.comments-section-title {
  margin-bottom: 2rem;
}

.comments-section-wrapper {
  margin-top: 2rem;
}

.comment-wrapper-parent {
  margin: 3rem 0;
}

.comment-wrapper-child {
  margin-top: 1rem;
}

.comment-wrapper {
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
  padding: 0.5rem 0 1rem 0;
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