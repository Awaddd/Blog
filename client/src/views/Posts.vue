<template>
  <div class="">

    <section class="test">
        <div>
          <h3>Read enough? 
            <br>Hit the button below if you think you're ready to start writing</h3>
            <router-link to="/posts/new" tag="button" 
            class="btn btn-action accent">
            Start Writing</router-link>
        </div>
    </section>    
    
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

.test {
  display: grid;
  // margin: 35px 0;
  padding: 2rem;
  margin-bottom: 35px;
  justify-content: center;
  h3 {
    font-weight: $font-thin;
    text-align: center;
  }
  div {
    justify-self: center;
    display: grid;
    justify-items: center;
    grid-gap: 10px;
  }
}


      

    


</style>
