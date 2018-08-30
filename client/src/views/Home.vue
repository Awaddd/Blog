<template>
  <div>
      <header class="hero">
        <div>
          <h1>Introducing Just Blog It.</h1>
          <p>Designed to give you the easiest possible blogging experience.</p>
        </div>

        <div>
            <router-link to="/posts/new" tag="button" 
            class="btn btn-action accent">
            Start Writing</router-link>
        </div>
      </header>

    <div class="container">
      <h2 class="underline">Posts</h2>
      
      <app-posts></app-posts>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import AppPosts from '@/components/AppPosts.vue'

export default {
  name: 'home',
  components: {
    'app-posts': AppPosts
  }
}
</script>

<style lang="scss">

@import '../styles/app.scss';

  .hero {
    padding: 0 1.5rem;
    padding-bottom: 3rem;
    background: $primary;
    color: #fff;

    display: grid;
    grid-gap: 25px;

    text-align: center;

    h1 {
    // font-size: 1.2rem;
    // margin: 0;
    font-weight: $font-thin;
  }

  p {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}

</style>
