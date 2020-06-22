<template>
  <div>

    <addComment class="add-comment-section" />

    <div class="no-commments" v-if="!comments">
      No comments at the moment. Be the first!
    </div>

    <div class="comments-section-wrapper">
      <div v-for="(comment, i) in comments" :key="i" class="comment-wrapper-parent" :class="{ 'currentComment': activeCommentThread(comment, i) }">
        <article class="parent-comment">
          <figure class="media-left">
              <img v-if="comment.author.image" class="circle-picture image is-48x48" :src="comment.author.image" />
              <!-- <img v-else class="circle-picture image is-48x48" src="https://bulma.io/images/placeholders/128x128.png" /> -->
              <span v-else class="circle-picture image is-48x48 myAvatar" :style="{ backgroundColor: avatarColor }">
                  {{generateAvatar(comment.author.firstName)}}
              </span>
          </figure>
          <div>
             <strong class="is-capitalized">{{comment.author.firstName}} {{comment.author.lastName}}</strong>

             <p class="actual-comment">{{comment.content}}</p>

              <div class="comments-section-comment-controls">

                <div v-if="isReply && (currentReply._id === comment._id)" @click="closeReplyInput(comment, i)" class="icon-button">
                  <b-icon icon="close" size="is-small" ></b-icon>
                </div>

                <div v-else @click="reply(comment, i)" class="icon-button">
                  <b-icon icon="reply" size="is-small" type="reply"></b-icon>
                </div>

                <!-- <span> 2 hrs ago</span> -->
                <span class="comments-section-comment-controls-time">{{formatDateTime(comment.createdAt)}}</span>

              </div>
              <template v-if="showHideOpenRepliesButton(comment, i)">  
                <span v-if="comment.hasReplies === true" tag="button" class="add-comment-view-more" @click="viewReplies(comment, i)">
                  <b-icon icon="chevron-down"></b-icon>
                  View replies
                </span>
              </template>

              <span tag="button" class="add-comment-view-more" v-if="showHideCloseRepliesButton(comment, i)" @click="hideReplies(comment, i)">  
                <b-icon icon="chevron-up"></b-icon>
                Close
              </span>
          </div>

          <div class="comment-action" v-if="((user) && (user._id === comment.author._id))" @click="confirmDeleteComment(comment)">
            <b-icon icon="delete-outline"></b-icon>
          </div>

          <div class="add-comment-reply-wrapper reply-modifier" v-if="isReply && (currentReply._id === comment._id)">
            <AddComment class="add-comment-reply" :discussion="comment.discussion_id" :replyingTo="comment._id" :replyingToUser="comment.author._id" />
            <template>
            </template>
          </div>

          <!-- REPLIES -->
          <div class="add-comment-reply-wrapper replies-wrapper" v-if="showReplies(comment, i)" >
            <div v-for="(reply, k) in replies" :key="k" class="comment-wrapper-child">

              <article class="child-comment">
                <figure class="media-left">
                    <!-- <img class="circle-picture image is-48x48" src="https://bulma.io/images/placeholders/128x128.png" /> -->
                  <img v-if="reply.author.image" class="circle-picture image is-48x48" :src="reply.author.image" />
                  <!-- <img v-else class="circle-picture image is-48x48" src="https://bulma.io/images/placeholders/128x128.png" /> -->
                  <span v-else class="circle-picture image is-48x48 myAvatar" :style="{ backgroundColor: avatarColor }">
                    {{generateAvatar(reply.author.firstName)}}
                  </span>
                    <!-- <img class="circle-picture image is-64x64" :src="reply.author.image" /> -->
                </figure>
                <div>
                  <strong class="is-capitalized">{{reply.author.firstName}} {{reply.author.lastName}}</strong>
                  <br>
                  <!-- <p class="comments-section-comment-reply">
                    <b-icon icon="reply" type="is-primary"></b-icon>
                    <span>Replying to {{comment.author.firstName}}</span>
                  </p> -->
                  
                  <p class="actual-comment"> <span class="has-text-primary" v-if="reply.replyingToUser">@{{reply.replyingToUser.firstName}}</span> {{reply.content}} </p>
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

                    <div v-if="isReplyChild && (currentReplyChild._id === reply._id)" @click="closeReplyChildInput(reply, k)" class="icon-button">
                      <b-icon icon="close" size="is-small" ></b-icon>
                    </div>
                    <div v-else @click="replyChild(reply, k)" class="icon-button">
                      <b-icon icon="reply" size="is-small" type="reply"></b-icon>
                    </div>

                    <span class="comments-section-comment-controls-time">{{formatDateTime(reply.createdAt)}}</span>
                    <!-- <span> 2 hrs ago</span> -->
                  </div>
                </div>

                <div class="comment-action" v-if="((user) && (user._id === reply.author._id))" @click="confirmDeleteComment(reply)">
                  <b-icon icon="delete-outline"></b-icon>
                </div>

                <div class="add-comment-reply-wrapper reply-modifier" v-if="isReplyChild && (currentReplyChild._id === reply._id)">
                  <AddComment class="add-comment-reply" :discussion="comment.discussion_id" :replyingTo="reply._id" :replyingToUser="reply.author._id"  />
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
import { formatCommentDate } from '@/helpers/helpers';

export default {
  components: {
    AddComment
  },
  computed: {
    ...mapGetters({ comments: 'getComments', allReplies: 'getReplies', user: 'getUser' }),
  },
  data () {
    return {
      replies: null,
      isReply: null,
      isReplyChild: null,
      currentReply: null,
      currentReplyChild: null,
      active: null,
      avatarColor: null
    }
  },
  methods: {
    activeCommentThread(comment, i) {
      if ((this.replies) && (comment._id === this.currentReply._id)) return true;
      return false;
    },
    viewReplies(comment, i) {

      this.active = true;

      this.currentReply = {
        _id: this.comments[i]._id,
        discussion_id: this.comments[i].discussion_id
      };

      this.replies = [];

      if (this.allReplies) {
        this.allReplies.forEach(item => {
          if (comment.discussion_id === item.discussion_id) {
              this.replies.push(item);
            }
        });
      }
    },
    reply(comment, i) {
      this.currentReply = {
        _id: this.comments[i]._id,
        discussion_id: this.comments[i].discussion_id
      };
      this.replies = null;
      this.isReply = true;
    },
    closeReplyInput(comment, i) {
      this.isReply = false;
    },
    replyChild(reply, i) {
      this.currentReplyChild = {
        _id: this.replies[i]._id,
        discussion_id: this.replies[i].discussion_id
      };
      this.isReplyChild = true;
    },
    closeReplyChildInput(reply, i) {
      this.isReplyChild = false;
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
        this.isReply = false;
        return false;
      } else return true;
    },
    showHideCloseRepliesButton(comment, reply) {
      if (this.replies && (comment._id === this.currentReply._id)) {
        return true;
      }
    },
    formatDateTime(datetime) {
      return formatCommentDate(datetime);
    },
    confirmDeleteComment(comment) {
      this.$buefy.dialog.confirm({
        title: 'Delete Comment',
        hasIcon: true,
        message: 'Are you sure you want to <b>delete</b> your comment? This comment will be gone for good.',
        confirmText: 'Delete Comment',
        type: 'is-warning',
        onConfirm: () => this.deleteComment(comment)
      });
    },
    async deleteComment(comment) {
      

      const response = await CommentsService.deleteComment(comment);

      if (response.status !== 200) {
        this.$buefy.toast.open({
          duration: 3000,
          message: 'Something went wrong',
          type: 'is-danger'
        });
      }
      else if (response.status === 200) {
        this.$store.dispatch("RELOAD_COMMENTS", true);
        this.$buefy.toast.open({
          duration: 3000,
          message: response.data.message
        });
      }
      
    },
    generateAvatar(name) {
      this.avatarColor = '#2fe05e';
      return name[0];
    }
  }
}
</script>

<style lang="scss">

.reply-modifier {
  margin-top: 0.8rem;
}

.add-comment-section {
  padding: 0 2rem;
}

.no-commments {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-weight: 600;
  border-left: 5px solid rgba(255, 0, 0, 0.5);
}

.comments-section-title {
  margin-bottom: 2rem;
}

.comments-section-wrapper {
  margin-top: 3rem;
}


.replies-wrapper {
  margin-top: 1.5rem;
  display: grid;
  grid-gap: 1.5rem;
}

.comment-wrapper-parent {
  margin: 2rem 0;
  border-left: 7px solid #fff;
  border-right: 7px solid #fff;
}

.currentComment {
  border-left: 7px solid rgba(0, 0, 255, 0.5);
}

.parent-comment, .child-comment {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
}

.parent-comment {
  margin: 0 1.5rem;
}

.actual-comment {
  // white-space: pre-line;
  white-space: pre-wrap;
}

.comment-action {
  // visibility: hidden;
  transition: all ease-in-out;
  span {
    cursor: pointer;
    color: #8c8a8a;
  }
}

.comments-section-comment-reply {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, max-content);
  padding: 1rem 0;
}


.comments-section-comment-controls {
  display: grid;
  grid-gap: 10px;
  padding: 0.5rem 0 0 0;
}

.comments-section-comment-controls-time {
  grid-row: 2;
  grid-column: 1/10;
}

.add-comment-view-more {
  margin-top: 10px;
  display: grid; 
  grid-template-columns: max-content max-content; 
  grid-gap: 5px;
  cursor: pointer;
  user-select: none;
}

.add-comment-reply-wrapper {
  grid-column: 1/4;
}

.add-comment-reply {
}

.myAvatar {
  display: grid;
  justify-content: center;
  align-content: center;
  color: #fff;
  font-size: 1.5rem;
}

@media only screen and (min-width: 360px) {

  .parent-comment {
    padding: 0 2rem;
    margin: 0;
  }

  .comments-section-comment-controls {
    grid-template-columns: repeat(4, max-content);
  }

  .comments-section-comment-controls-time {
    grid-row: auto;
    grid-column: auto;
  }

}

@media only screen and (min-width: 768px) {
  .comment-action {
    visibility: hidden;
  }
  .parent-comment:hover {
    .comment-action {
      visibility: visible;
    }
  }
}

@media only screen and (min-width: 770px) {

  .no-commments {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    margin-left: 2rem;
    border-left: 3px solid rgba(255, 0, 0, 0.5);
  }

  .currentComment {
    border-left: 7px solid #fff;
    border-right: 7px solid #fff;
  }

  .add-comment-reply-wrapper {
    display: grid;
    grid-column: 2/4;
  }
  .add-comment-reply {
    display: grid;
  }
}

</style>