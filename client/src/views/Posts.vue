<template>
  <div>
    <header>
      <app-nav></app-nav>
    </header>

    <main class="container">
      <section class="posts panel-wrapper">
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

.posts {
}

</style>
