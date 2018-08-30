<template>
  <div class="container">
    <h2 class="underline">Posts</h2>
    
    <section class="posts">

      <app-posts></app-posts>

    </section>

    <!-- <section>
      <h4>There are no posts to display...</h4>
    </section> -->
  </div>
</template>

<script>

import AppPosts from '@/components/AppPosts.vue'

  export default {
    name: 'posts',
    components: {
      'app-posts': AppPosts
    }
  }
</script>

<style lang="scss">

@import '../styles/app.scss';

  .posts {
    // background-color: #6900ff; 
    width: 100%;
  }


  .yellow {
    color: #ffd700;
  }



      

    


</style>
