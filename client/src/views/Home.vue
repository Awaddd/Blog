<template>
  <div>
    <div class="container home-content">
      <div class="section-title">
        <span class="btn btn-action accent">Latest Posts</span>
      </div>

      <section class="posts">
        <app-posts></app-posts>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppPosts from "@/components/AppPosts.vue";

export default {
  name: "home",
  components: {
    "app-posts": AppPosts
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.home-title {
  background: #fff;
  width: 100%;
  text-align: center;
  padding: 0.5rem 0 1.5rem 0;
}
</style>
