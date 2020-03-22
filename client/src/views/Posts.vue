<template>
  <div>
    <header>
      <app-nav></app-nav>
    </header>

    <main class="my-container">
      <section class="posts post-wrapper">
        <p class="highlight hug key-text">All Posts</p>
        <app-posts></app-posts>
      </section>
    </main>
    
  </div>
</template>

<script>
import AppPosts from "@/components/AppPosts.vue";
import Nav from "@/components/Nav.vue";

export default {
  name: "home",
  components: {
    "app-posts": AppPosts,
    "app-nav": Nav
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.post-wrapper {
  margin-top: 1rem;
  padding: 0 1rem;
  display: grid;
  grid-gap: 10px;
}

@media only screen and (min-width: 700px){
  .post-wrapper {
    margin-top: 2rem;
    padding: 0 2rem;
    grid-gap: 20px;
  }
}

@media only screen and (min-width: 1200px){
  .post-wrapper {
    margin-top: 2rem;
    padding: 0;
    grid-gap: 30px;
  }
}

@media only screen and (min-width: 1200px){
  .post-wrapper {
    margin-top: 3rem;
    padding: 0;
    grid-gap: 30px;
  }
}

</style>
