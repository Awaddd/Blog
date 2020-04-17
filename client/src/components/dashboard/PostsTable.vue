<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span>Posts / </span> 
        <span class="dashboard-breadcrumbs-current">All</span>
      </p>
    </nav>    

    <!-- <div class="my-placeholder-message" v-if="!tableData">
      <p class="subtitle is-5 is-size-6-mobile has-text-success has-text-centered">You don't have any posts at the moment. Click below to get started!</p>
      <button class="my-btn" @click="redirectNewPost">Start Writing</button>
    </div> -->

    <div class="postsTable-placeholder-content" v-if="!tableData">

      <div class="has-text-centered">
        <h1 class="title is-size-4-mobile">I'm Empty :(</h1>
        <p class="subtitle is-size-6-mobile">Click the button below to start writing</p>
      </div>

      <figure class="image postsTable-placeholder-image">
        <img src="../../assets/empty.svg" alt="">
      </figure>

      <b-button type="is-primary" outlined @click="redirectNewPost">Start Writing</b-button>

    </div>
    
    <div class="posts-table-content" v-else>

      <div class="select-featured-post">
        <b-field label="Featured Post" horizontal custom-class="is-size-7-mobile is-size-7-tablet is-size-6-desktop">
          <b-select placeholder="Choose Post" expanded v-model="featuredPostID" @input="selectFeaturedPost()">
            <option :value="post._id" v-for="(post, i) in tableData" :key="i">{{post.title}}</option>
          </b-select>
        </b-field>
      </div>


      <div class="searchPosts">
        <b-field label="search" horizontal custom-class="is-size-7-mobile is-size-7-tablet is-size-6-desktop">
          <b-input type="search" icon-right="magnify" placeholder="The name of the wind..."></b-input>
        </b-field>
      </div>


      <template>
        <div v-if="!tableData">
          No posts at the moment
        </div>
        <b-table v-else :data="tableData"
        :paginated="true"
        :pagination-simple="true"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-position="paginationPosition"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        hoverable>
        
          <template slot-scope="props" >

            <b-table-column field="tableData.title" label="Title">
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label">
                  {{ column.label }}
                </b-tooltip>
              </template>
              {{ props.row.title }}
            </b-table-column>

            <b-table-column field="tableData.summary" label="Summary">
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label">
                  {{ column.label }}
                </b-tooltip>
              </template>
              {{ props.row.summary }}
            </b-table-column>

            <b-table-column field="tableData.createdAt" label="Published Date">
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label">
                  {{ column.label }}
                </b-tooltip>
              </template>
              {{ formatDate(props.row.createdAt) }}
            </b-table-column>

            <b-table-column field="" label="Controls">
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label">
                  {{ column.label }}
                </b-tooltip>
              </template>

              <div class="field is-grouped">
                <p class="control">
                  <b-button type="is-dark-lighter" tag="router-link" :to="{name: 'BlogPost', params: {title: sanitizeTitle(props.row.title)}}" icon-right="eye"></b-button>
                </p>
                <p class="control">
                  <b-button type="is-info" icon-right="playlist-edit" @click="editPost(props.row._id)" />
                </p>
                <p class="control">
                  <b-button type="is-danger" icon-right="delete" @click="deletePost(props.row._id)" />
                </p>

                
              </div>
            </b-table-column>

            

          </template>
        </b-table>
      </template>
    </div>    
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
// import { serverBus } from '../main';
import { mapGetters } from 'vuex';
import { sanitizeTitle, formatDate} from '@/helpers/helpers';

export default {
  data: function() {
    return {
      columns: [
        {
          field: 'title',
          label: 'Title'
        },
        {
          field: 'summary',
          label: 'Summary'
        },
        {
          field: 'createdAt',
          label: 'Published'
        }
      ],
      currentPage: 1,
      perPage: 3,
      paginationPosition: 'bottom',
      featuredPostID: null
    }
  },
  computed: {
    ...mapGetters({tableData : "getUserPosts"})
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchUserPosts();
      if (response.status !== 200) this.$store.dispatch("SET_USER_POSTS", null);
      else this.$store.dispatch("SET_USER_POSTS", response.data.posts);
    },

    async selectFeaturedPost() {
      console.log(this.featuredPostID);
      const response = await PostsService.updateFeaturedPost(this.featuredPostID);
      console.log(response);
    },

    sanitizeTitle: function(title) {
      return sanitizeTitle(title);
    },

    formatDate(date) {
      return formatDate(date);
    },

    async deletePost(post) {
      if (post) {
       const res = await PostsService.deletePost(post);
        this.$store.dispatch("DELETE_USER_POST", post);       
      }
    },

    editPost(post){
      this.$router.push({ name: "EditPost", params: {postID: post } });
    },

    redirectNewPost () {
      this.$router.push({ name: "NewPost" });
    }
  },
  mounted () {
    this.getPosts();
  }
};
</script>


<style lang="scss" scoped>

.my-placeholder-message {
  display: grid;
  justify-items: center; 
}

.posts-table-content {
  display: grid;
  grid-gap: 20px;
}

.postsTable-placeholder-content {
  display: grid;
  grid-gap: 30px;
  justify-content: center;
  justify-items: center;
  padding: 1rem 0;
}

.postsTable-placeholder-image {
  max-width: 200px;
}

@media only screen and (min-width: 770px) {

  .my-btn {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  .postsTable-placeholder-content { 
    grid-gap: 50px;
  }

  

}

@media only screen and (min-width: 1200px) {
  .postsTable-placeholder-image {
    max-width: 250px;
  }
}

@media only screen and (min-width: 1600px) {
  .postsTable-placeholder-image {
    max-width: 400px;
  }
}

</style>
