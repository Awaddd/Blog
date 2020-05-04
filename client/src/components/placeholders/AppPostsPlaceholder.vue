<template>
  <div class="cards-wrapper my-container">

      <div class="card" v-for="(val, i) in showAmount" :key="i">
          <div class="card-image">
            <figure class="image is-5by3 card-image-placeholder">
            </figure>
          </div>
          <div class="card-content-placeholder">
            <p class="title-placeholder"></p>
            <div class="content-placeholder">
            </div>
          </div>
      </div>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      posts: []
    };
  },
  props: ['showAmount'],
  methods: {
  }
};
</script>

<style lang="scss">

.card-image-placeholder {
  background: rgb(235, 235, 235);
}

.card-content-placeholder {
  display: grid;
  grid-gap: 10px;
  padding: 0.8rem 0;
}

.title-placeholder {
  padding: 1.2rem;
  background: rgb(240, 240, 240);
}

.content-placeholder {
  padding: 4rem;
  background: rgb(240, 240, 240);
}

</style>

