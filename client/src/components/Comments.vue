<template>
  <div class="comments-section">
    <div class="comments-section-title">
      <h2 class="title is-size-5">Comments</h2>
      <hr class="subtitle">
    </div>
    <div class="comments-section-wrapper" v-if="!comments">
      <b-button is-outlined type="is-danger" @click="loadComments(5)">Load Comments (60)</b-button>
    </div>
    <div class="comments-section-wrapper" v-else>
      <Comment />
      <Comment />
      <Comment :isReply="true"  />
      <Comment />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comments/Comment.vue";

export default {
  components: {
    Comment
  },
  data () {
    return {
      comments: true,
      numOfComments: null
    }
  },
  methods: {
    loadComments(numOfComments) {
      this.comments = true;
      this.numOfComments = numOfComments;
      console.log(this.comments);
      console.log(this.numOfComments);
    }
  }
}
</script>

<style lang="scss">

.comments-section {
  margin-top: 3rem;
}

.comments-section-wrapper {
  padding: 3rem 0;
  display: grid;
  justify-items: center;
}

.comments-section-comment {
}

.comments-section-comment-reply {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, max-content);
  padding: 1rem 0;
}

.comments-section-comment-controls {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 10px;
  padding: 1rem 0;
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