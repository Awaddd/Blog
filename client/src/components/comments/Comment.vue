<template>
  <div>
    <article class="comment-wrapper">
      <figure class="media-left">
          <img class="circle-picture image is-64x64" :src="comment.image">
      </figure>
      <div>
        <strong>{{comment.name}}</strong>
        <br>
        <p class="comments-section-comment-reply" v-if="comment.replyingTo">
          <b-icon icon="reply" type="is-primary"></b-icon>
          <span>Replying to {{comment.replyingTo}}</span>
        </p>
        {{comment.comment}}
        <br>
        <!-- <small><a>Like</a> · <a>Reply</a> · 3 hrs </small> -->
        <div class="comments-section-comment-controls">
          <b-icon icon="heart" type="is-danger"></b-icon>
          <div @click="reply" class="icon-button">
            <b-icon icon="reply" type="is-dark"></b-icon>
          </div>
          <span>{{comment.dateTime}} ago</span>
        </div>
      </div>

      <div class="add-comment-reply-wrapper">
        <AddComment class="add-comment-reply" v-if="isReply" />
      </div>
    </article>
    

  </div>
</template>

<script>
import AddComment from "@/components/comments/AddComment.vue";

export default {
  props: ['comment'],
  components: {
    AddComment
  },
  data () {
    return {
      isReply: false
    }
  },
  methods: {
    reply () {
      this.isReply = !this.isReply;
      console.log('SKR');
    }
  }
}
</script>

<style lang="scss">
.comment-wrapper {
  padding: 1rem 0;
  display: grid;
  grid-template-columns: max-content 1fr;
}

.add-comment-reply-wrapper {
  grid-column: 1/4;
}

.add-comment-reply {
  margin-bottom: 3rem;
}

@media only screen and (min-width: 770px) {
  .comment-wrapper {
  }

  .add-comment-reply-wrapper {
    display: grid;
    // justify-items: end;
    grid-column: 2/4;
  }
  .add-comment-reply {
    display: grid;
    // min-width: 90%;
  }
}

</style>