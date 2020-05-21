<template>
  <div class="posts">
    <main class="my-container posts-content">
      <section class="post-posts">
        <router-view/>
      </section>
    </main>
  </div>
</template>

<script>

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
