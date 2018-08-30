<template>
  <div class="cards-wrapper">
    <div class="card" v-for="(post, k, i) in posts" :key="i">
        
        <div>
          <h4>Post <span class="">{{i}}</span> {{post.title}}</h4>
        </div>

        <p>{{post.content}}</p>
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

 
</style>

