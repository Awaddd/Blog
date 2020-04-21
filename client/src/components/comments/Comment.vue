<template>
  <article class="media">
    <figure class="media-left">
        <img class="circle-picture image is-64x64" src="https://bulma.io/images/placeholders/128x128.png">
    </figure>
    <div class="comments-section-comment">
      <strong>Awad Dini</strong>
      <br>
      <p class="comments-section-comment-reply" v-if="isReply">
        <b-icon icon="reply" type="is-primary"></b-icon>
        <span>Replying to John</span>
      </p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, quo! Corrupti cupiditate architecto, a quasi omnis voluptates distinctio totam labore!
      <br>
      <!-- <small><a>Like</a> · <a>Reply</a> · 3 hrs </small> -->
      <div class="comments-section-comment-controls">
        <b-icon icon="heart" type="is-danger"></b-icon>
        <b-icon icon="reply" type="is-dark"></b-icon>
        <span>3 hrs</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['isReply']
}
</script>