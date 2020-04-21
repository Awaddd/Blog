<template>
  <article class="media comment-wrapper">
    <figure class="media-left">
        <img class="circle-picture image is-64x64" :src="comment.image">
    </figure>
    <div class="comments-section-comment">
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
        <b-icon icon="reply" type="is-dark"></b-icon>
        <span>{{comment.dateTime}} ago</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['comment']
}
</script>

<style lang="scss">
  .comment-wrapper {
    padding: 1rem 0;
  }
</style>