<template>
  <div>
    <form class="media">
      
      <div class="media-content">
        <span v-if="notification"> {{notification}}</span>
        <div class="field">
          <p class="control">
            <textarea class="textarea" v-model="content" placeholder="Add a comment..."></textarea>
          </p>
        </div>
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
  props: ['discussion'],
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
      console.log('before res');
      console.log(this.getCurrentPost);
      console.log('REPLYING TO: ', this.replyingTo);
      if (!this.getLoginStatus) this.notification = 'Please login';
      else {
        let comment = {
          content: this.content,
          postTitle: this.getCurrentPost.title.replace(/-/g, " ").toLowerCase()
        };

        if (this.discussion) comment.discussion_id = this.discussion;
        // retrieve discussion id
        const response = await CommentsService.addComment(comment);
      
        if (response.status !== 200) {
          console.log('add comment error ERROR: ', response.data);
        } else if (response.status === 200) this.content = null;
        
        console.log('after res', response.data);
      } 
    }
  }

}
</script>

<style lang="scss">

</style>