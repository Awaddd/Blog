<template>
  <div class="cards-wrapper">

    <!-- Static -->
    <!-- <div class="post">
      <img src="../assets/card-1.png" alt="" class="post-content__img">
      <article class="post-content__article">
        <h4 class="hug">Angular 3 Soon Out - Here's What You Need To Know</h4>
        <p class="hug"></p>
        <p class="highlight">Read More</p>
      </article>
    </div> -->

    <!-- Only static images -->
    <div class="" v-for="(post, i) in posts" :key="i">
      <!-- post in posts.slice(0, 4) -->
      <router-link
        class="post"
        :to="{
              name: 'BlogPost',
              params: {title: sanitizeTitle(post)}
          }"
      >
          <!-- <img src="../assets/card-1.png" alt="" class="post-content__img"> -->
          <!-- <img :src="randomImg(i)" class="post-content__img"> -->
          <img :src="post.image" class="post-content__img">
          <article class="post-content__article">
            <h4 class="post-title ">{{post.title}}</h4>
            <p class="">{{sanitizeSummary(post)}}</p>
            <p class="highlight read-more ">Read More</p>
          </article>
      </router-link>
    </div>

  </div>
</template>

<script>
import PostsService from "@/services/PostsService";

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPosts();
  },
  computed: {
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
      console.log(this.posts);
    },
    sanitizeTitle: function(post) {
      console.log(post.title);
      const title = post.title.replace(/\s+/g, "-").toLowerCase();
      return title;
    },
    sanitizeSummary: function(post) {
      if (post.summary) {
        console.log(post.summary);
        console.log(post.title + ': ' + post.title.length);
        let length = 100;
        let summary = post.summary.substring(0, length);
        return summary + '...';
      } 
    }
    // randomImg (img) {
    //   let i = 0;
    //   let randomImg;
    //   for (i; i < this.posts.length; i++){
    //     randomImg = `https://picsum.photos/500/29${img}`
    //   }
    //   return randomImg;
    // }
  }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.post-title {
  text-transform: capitalize;
}

// .post-wrapper {
//   display: grid;
//   grid-gap: 20px;
// }

.post {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.65rem;
  cursor: pointer;

  .post-content__img {
    max-width: 100%;
  }

  .post-content__article {
    display: grid;
    height: 100%;
    color: #707070;

    h4 {
      font-size: 0.55rem;
      line-height: 1.5;
      margin: 0;
    }
    p {
      font-size: 0.45rem;
      line-height: 1.5;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .read-more {
      align-self: end;
    }
  }
}

@media only screen and (min-width: 350px) {
  .post { 
    .post-content__article {
      p {
        text-overflow: initial;
        white-space: normal;
        overflow: visible;
      }
    }
  }
}


@media only screen and (min-width: 700px) {
// font-size h4 : 0.8484rem;
  // .card-wrapper {
  //   grid-gap: 20px;
  // }
  .post {
    
    grid-template-columns: 1fr;
    // max-width: 330px;
    grid-gap: 20px;
    align-content: start;

 

    .post-content__article {
      padding: 0 0.5rem;
      h4 {
        font-size: 0.8884rem;
        line-height: 1.5;
        margin-top: 0.7em;
      }
      p {
        font-size: 0.8484rem;
        line-height: 1.5;
        margin-top: 0.7rem;
      }

      .read-more {
        margin-top: 1.5rem;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .post {
    grid-template-columns: 1fr;
    grid-gap: 0rem;
    // max-width: 330px;

    .post-content__article {
      h4 {
        margin-top: 1.5rem;
      }
    }
  }
}
</style>

