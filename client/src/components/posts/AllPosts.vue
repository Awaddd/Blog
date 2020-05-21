<template>
  <div>
    <app-posts :categoryID="$route.params.categoryID" :title="$route.params.plural" ></app-posts>
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

