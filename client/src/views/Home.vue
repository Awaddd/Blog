<template>
  <div>
    <div class="container home-content">
      <!-- <app-posts></app-posts> -->
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

.home-content {
  background: #f9f9fa;
  margin: 0;
}

.home-title {
  background: #fff;
  width: 100%;
  text-align: center;
  padding: 0.5rem 0 1.5rem 0;
}
</style>
