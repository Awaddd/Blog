<template>
  <div class="cards-wrapper">
    <div class="card" v-for="(post, i) in posts" :key="i">
        <!-- post in posts.slice(0, 4) -->
        <div>
          <h4 class="primary-text">{{post.title}}</h4>
        </div>

        <p>{{post.content}}</p>
        <span class="secondary-text read-more">Read more...</span>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
    data () {
      return {
        posts: []
      }
    },
    mounted () {
      this.getPosts()
    },
    methods: {
      async getPosts(){
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      }
    }
  }

</script>

<style lang="scss">

.read-more {
  cursor: pointer;
}
 
</style>

