<template>
  <div>
    <section class="section-title">
      <span class="btn btn-action accent">Latest Posts</span>
    </section>

    <section class="posts">
      <app-posts></app-posts>
    </section>
  </div>
</template>

<script>
import AppPosts from "@/components/AppPosts.vue";

export default {
  name: "posts",
  components: {
    "app-posts": AppPosts
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.posts {
  width: 100%;
}
</style>
