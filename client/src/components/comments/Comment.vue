<template>
  <div>
    <article class="comment-wrapper">
      <figure class="media-left">
          <!-- <img class="circle-picture image is-64x64" :src="comment.image"> -->
          <img class="circle-picture image is-64x64" src="https://bulma.io/images/placeholders/128x128.png" />
      </figure>
      <div>
        <strong class="is-capitalized">{{comment.author.firstName}} {{comment.author.lastName}}</strong>
        <br>
        <!-- <p class="comments-section-comment-reply">
          <b-icon icon="reply" type="is-primary"></b-icon>
          <span>Replying to John Smith</span>
        </p> -->
        {{comment.content}}
        <br>
        <!-- <small><a>Like</a> · <a>Reply</a> · 3 hrs </small> -->
        <div class="comments-section-comment-controls">
          <div @click="favourite" class="icon-button">
            <div v-if="!isFavourite" >
              <span style="margin-right: 10px; font-weight: 600;">13</span>
              <b-icon icon="heart-outline" size="is-small" class="heart" ></b-icon>
            </div>
            <div v-else>
              <span style="margin-right: 10px; font-weight: 600;">13</span>
              <b-icon icon="heart" type="is-danger" size="is-small" class="heart"></b-icon>
            </div>
          </div>
          
          <div @click="reply" class="icon-button">
            <b-icon icon="reply" size="is-small" type="reply"></b-icon>
          </div>
          <span>{{formatDate(comment.createdAt)}}</span>
          <!-- <span> 2 hrs ago</span> -->
        </div>
        <span tag="button" class="add-comment-view-more">  
          <b-icon icon="chevron-down"></b-icon>
          View replies
        </span>
      </div>

      <div class="add-comment-reply-wrapper" v-if="isReply" >
        <AddComment class="add-comment-reply" :discussion="comment.discussion_id" />
      </div>
    </article>
    

  </div>
</template>

<script>
import AddComment from "@/components/comments/AddComment.vue";
import { formatDate } from '@/helpers/helpers';

export default {
  props: ['comment'],
  components: {
    AddComment
  },
  data () {
    return {
      isReply: false,
      isFavourite: false
    }
  },
  methods: {
    reply () {
      this.isReply = !this.isReply;
    },
    favourite () {
      this.isFavourite = !this.isFavourite;
    },
    formatDate(date) {
      return formatDate(date);
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
    // justify-items: end;
    grid-column: 2/4;
  }
  .add-comment-reply {
    display: grid;
    // min-width: 90%;
  }
}



</style>