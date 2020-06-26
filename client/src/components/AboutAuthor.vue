<template>
  <div>     
      <div class="author-section-wrapper" v-if="user">
        <div class="author-section-media">
          <figure class="image author-section-image">
            <!-- placeholder  -->
            <img v-if="!user.image" src="../assets/person.png" class="circle-picture" alt="author-image">
            <img v-else class="circle-picture author-picture" :src="user.image" alt="author-image">
          </figure>
          <div class="author-section-bio has-text-centered">
            <h2 class="has-text-weight-normal is-size-5-mobile is-size-4 is-capitalized">{{user.firstName}} {{user.lastName}}</h2>
            <h3 class="subtitle is-size-6-mobile is-size-6" style="white-space: pre-wrap;">{{user.bio}}</h3>
            <div class="icon-group" v-if="user.socials">
              <a :href="user.socials[0]"><b-icon class="facebook" icon="facebook"></b-icon></a>
              <a :href="user.socials[1]"><b-icon class="linkedin" icon="linkedin"></b-icon></a>
              <a :href="user.socials[2]"><b-icon class="twitter" icon="twitter"></b-icon></a>
            </div>
          </div>
          
        </div>
        <div class="author-section-bio">
          <!-- <p>{{user.bio}}</p> -->
        </div>
      </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  props: ['authorID'],
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.getAuthor();
  },
  methods: {
    async getAuthor() {
      const response = await UserService.fetchAuthorDetails(this.authorID);
      if (response.status !== 200) console.log(response.data.message); 
      else if ((response.data) && (response.status === 200)) {
        this.user = response.data;
      }
    }
  }
}
</script>

<style lang="scss">

.author-section-wrapper {
  display: grid;
  grid-gap: 20px;
}

.author-section-media {
  display: grid;
  grid-gap: 20px;
  justify-items: center;
}

.author-section-image {
  max-width: 100px;
  max-height: 100px;
  img {
    width: 100px !important;
    height: 100px !important;
  }
}

.author-section-bio {
  text-align: center;
}

.icon-group {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 10px;
  justify-content: center;
}

.facebook {
  color: #3b5999;
}

.twitter {
  color: #55acee;
}

.linkedin {
  color: #0077B5;
}

@media only screen and (min-width: 770px) {
  .icon-group {
    justify-content: center;
    margin-top: -0.5rem;
  }

  .author-section-media {
    // grid-template-columns: max-content max-content;
    justify-items: center;
    grid-gap: 20px;
    // padding: 2rem 0;
  }

  .author-section-bio {
    text-align: start;
    max-width: 500px;
  }
}

</style>