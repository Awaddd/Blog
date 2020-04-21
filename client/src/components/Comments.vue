<template>
  <div class="comments-section">
    <div class="comments-section-title">
      <h2 class="title is-size-5">Comments</h2>
      <hr class="subtitle">
    </div>
    <div class="comments-section-loadmore" v-if="!commentsExist">
      <b-button is-outlined type="is-danger" @click="loadComments(5)">Load Comments (60)</b-button>
    </div>
    <div class="comments-section-wrapper" v-else>
      <div v-for="(comment, i) in comments" :key="i">
        <Comment :comment="comment" /> 
      </div> 
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
      comments: [
        {
          image: 'https://bulma.io/images/placeholders/128x128.png',
          name: 'Peter Brian',
          comment: 'Typical google being google. "hurr durr we have money, we have power, we can do what we want"',
          dateTime: '5 hrs'
        }, {
          image: 'https://bulma.io/images/placeholders/128x128.png',
          name: 'Awad Dini',
          comment: '"Typical google being google. "hurr durr we have money, we have power, we can do what we want" - What a disgusting argument. I disagree with it whole-heartedly. How can you endorse such a fallacy?',
          dateTime: '3 hrs',
          replyingTo: 'Peter Brian'
        }, {
          image: 'https://bulma.io/images/placeholders/128x128.png',
          name: 'John Smith',
          comment: 'I think we really should push for this as a society.',
          dateTime: '2 hrs'
        }, {
          image: 'https://bulma.io/images/placeholders/128x128.png',
          name: 'Charlie Waffling',
          comment: 'How can you stand behind such a despondent decision!?',
          dateTime: '2 hrs',
          replyingTo: 'John Smith'
        }, 
      ],
      commentsExist: false,
      numOfComments: null
    }
  },
  methods: {
    loadComments(numOfComments) {
      this.commentsExist = true;
      this.numOfComments = numOfComments;
      console.log(this.commentsExist);
      console.log(this.numOfComments);
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