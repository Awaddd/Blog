<template>
  <div>
    <section class="section">
        <app-posts></app-posts>
    </section>
  </div>
</template>

<script>
import AppPosts from "@/components/AppPosts.vue";

export default {
  components: {
    "app-posts": AppPosts
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
