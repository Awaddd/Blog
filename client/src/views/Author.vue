<template>
  <div class="blogPost-wrapper">
    <section class="blogPost" v-if="post">

      <div class="has-text-centered blogPost-header">
        <h1 class="title blogPost-header-title is-capitalized my-post-title">{{post.title}}</h1>
        <h3 class="subtitle blogPost-header-subtitle">{{post.summary}}</h3>
      </div>

      <header class="level">
        <div class="my-author-details">
          <p class="title is-size-6 has-text-primary is-capitalized">{{post.author.firstName}} {{post.author.lastName}}</p>
          <p class="subtitle is-size-6"><strong>{{formatDate(post.createdAt)}}</strong></p>
        </div>    
      </header>      

      <div class="breakOffLongWords" v-html="post.content"></div> 
      
    </section>

  </div>
</template>

<script>
import AuthorService from "@/services/AuthorService";
import { formatDate } from '@/helpers/helpers';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      post: null,
    }
  },
  mounted() {
    this.getAuthorPost();
  },
  methods: {
     async getAuthorPost() {
      const response = await AuthorService.getAuthorPost();
      if (response.status === 200) this.post = response.data;
    },
    formatDate(date) {
      return formatDate(date);
    }
  }
};
</script>


<style lang="scss" scoped>

@import "../styles/app.scss";

.blogPost-separator {
  width: 100%;
  border-bottom: 5px solid rgba(250, 250, 250, 0.5);
}

.my-post-title {
  font-weight: 600;
}

.my-author-details {
  padding: 1rem 0;
}

.blogPost-wrapper {
  margin-bottom: 2rem;
}

.blogPost {
  margin: 0 1.5rem;
  line-height: 1.5;
  padding: 2rem 0;
}

.blogPost-header {
  margin: 0 0 2rem 0;
}

.blogPost-header-title {
  color: #363636;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.125;
}

.blogPost-header-subtitle{
  color: #4a4a4a;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
}

.blogPost-image {
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
}

.viewCommentsWrapper {
  padding: 0 1.5rem;
  display: grid;
  justify-items: center;
}

.author-section {
  padding: 1rem 1.5rem;
}

.comments-section {
  margin: 3rem 0;
}


@media only screen and (min-width: 360px) {

  .blogPost {
    padding: 2rem 1rem;
  }
  .author-section, .viewCommentsWrapper {
    padding: 1rem 2.2rem;
  }

}

@media only screen and (min-width: 600px) {

  .blogPost-wrapper {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .blogPost-image {
    img {
      height: 200px;
    }
  }

}

@media only screen and (min-width: 700px) {
  .blogPost-wrapper {
    width: 90%;
    padding: 1.5rem;
  }
  .level {
    display: block;
  }
  .level-right {
    justify-content: flex-start;
  }

  .author-section, .viewCommentsWrapper {
    padding: 0 2.5rem;
    margin: 3rem 0;
  }
}

@media only screen and (min-width: 850px) {
  .level {
    display: flex;
  }
}

@media only screen and (min-width: 1000px) {

  .blogPost-wrapper {
    padding: 3rem 1.5rem;
  }
  
  .blogPost-header {
    margin: 0 0 2rem 0;
  }

  
  .blogPost-header-title {
    font-size: 1.8rem;
  }

  .blogPost-header-subtitle{
    font-size: 1.125rem;
  }

  .blogPost-image {
    img {
      height: 250px;
    }
  }

}

@media only screen and (min-width: 1200px) {
    
  .blogPost-header-subtitle{
    font-size: 1.25rem;
  }

  .blogPost-wrapper {
    width: 70%;
  }
  .level {
    display: flex;
  }


}

@media only screen and (min-width: 1600px) {
  .blogPost-wrapper {
    width: 50%;
    margin: 0 auto;
  }

  .blogPost-image {
    img {
      height: 300px;
    }
  }

  .my-post-title {
    max-width: 95%;
    margin: 0 auto;
  }
}

</style>

