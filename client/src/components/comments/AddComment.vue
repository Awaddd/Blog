<template>
  <div>
    <form class="media">
      
      <div class="media-content">
        <!-- <div class="field">
          <p class="control">
            <textarea class="textarea" v-model="content" placeholder="Add a comment..."></textarea>
          </p>
        </div> -->
        <b-field label="Comment" custom-class="is-small" class="field">
          <b-input maxlength="1500" type="textarea" v-model="content" placeholder="Add a comment..."></b-input>
        </b-field>
        <div class="field">
          <p class="control">
            <b-button type="is-primary" @click.prevent="addComment">Post comment</b-button>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CommentsService from "@/services/CommentsService";
import {mapGetters} from 'vuex';

export default {
  props: ['discussion', 'replyingTo', 'replyingToUser'],
  data () {
    return {
      content: null,
      notification: null
    }
  },
  computed: {
    ...mapGetters(["getCurrentPost", "getLoginStatus"])
  },
  methods: {
    async addComment () {
      if (!this.getLoginStatus) {
        this.$buefy.snackbar.open({
          message: 'Please login to comment',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Login',
          indefinite: true,
          onAction: () => {
            this.$router.push({ path: '/admin/login' })
          }
        });
      }
      else {

        if ((this.content === null ) || (this.content === '') || (this.content === ' ')){

          this.$buefy.toast.open({
            duration: 3000,
            message: 'Blank comments are not allowed',
            type: 'is-danger'
          });

          return;
        }

        let comment = {
          content: this.content,
          postTitle: this.getCurrentPost.title.replace(/-/g, " ").toLowerCase()
        };

        if (this.discussion) {
          comment.discussion_id = this.discussion;
          comment.replyingTo = this.replyingTo;
          comment.replyingToUser = this.replyingToUser;
        }
        // retrieve discussion id
        const response = await CommentsService.addComment(comment);
      
        if (response.status !== 200) {
          console.log('add comment error ERROR: ', response.data);
        } else if (response.status === 200) {
          this.$buefy.toast.open({
            duration: 3000,
            message: 'Comment posted',
            type: 'is-success'
          });
          this.content = null;
          this.$store.dispatch("SET_COMMENT_ADDED", true);
        }
        
      } 
    }
  }

}
</script>

<style lang="scss">

.media-content {
  div {
    margin-bottom: 0 !important;
  }
}

</style>