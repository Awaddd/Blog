<template>
  <div class="blogPost-wrapper">
    <section class="blogPost">

      <div class="has-text-centered blogPost-header">
        <h1 class="title blogPost-header-title is-capitalized my-post-title">About Me</h1>
        <h3 class="subtitle blogPost-header-subtitle">Get to know me</h3>
      </div>


      <header class="level">
        <div class="my-author-details">
          <p class="title is-size-6 has-text-primary is-capitalized">Omar Dini</p>
          <p class="subtitle is-size-6"><strong>17th July 2018</strong></p>
        </div>    
      </header>      

      <!-- <div v-html="post.content"> -->
      <div>
        <!-- content -->
      </div>
    </section>

  </div>
</template>

<script>
// import AboutAuthor from "@/components/AboutAuthor.vue";
import { mapGetters } from 'vuex';

export default {
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  computed: {
    // ...mapGetters({})
  },
  watch: {

  },
  methods: {

  }
};
</script>
