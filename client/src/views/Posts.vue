<template>
  <div class="posts">

    <header>
    </header>

    <main class="my-container posts-content">
      <section class="post-posts">
        <!-- add is-paddingless to remove padding on section -->
        <app-posts :title="title"></app-posts>     
      </section>
    </main>
  </div>
</template>

<script>
import AppPosts from "@/components/AppPosts.vue";

export default {
  components: {
    "app-posts": AppPosts
  },
  data () {
    return {
      title: 'All Posts'
    }
  }
}
</script>

<style lang="scss">
@import "../styles/app.scss";


.posts {
  margin: 1.5rem 0;
  padding: 0 1.5rem 0 1.5rem;;
}

.posts-content {
  padding: 1rem;
}

.posts-posts {
  margin: 0;
  padding: 1rem 1.5rem;
}

@media only screen and (min-width: 768px) {
  .posts-content {
    padding: 0
  }
}

@media only screen and (min-width: 1200px) {
  .posts {
    margin-bottom: 5rem;
  }
  .posts-posts {
    margin: 0;
    padding: 3rem 1.5rem;
  }
}
</style>
