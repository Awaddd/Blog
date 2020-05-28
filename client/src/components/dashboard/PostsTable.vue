<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span>Posts / </span> 
        <span class="dashboard-breadcrumbs-current">All</span>
      </p>
    </nav>    

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
        <b-field label="Featured Post" horizontal>
          <b-select placeholder="Choose Post" expanded v-model="featuredPostID" @input="selectFeaturedPost()">
            <option :value="post._id" v-for="(post, i) in tableData" :key="i">{{post.title}}</option>
          </b-select>
        </b-field>
      </div>
      <br>
      <template>
        <div v-if="!tableData">
          No posts at the moment
        </div>


        <b-table :data="filteredTableData"
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

            <b-table-column searchable field="tableData.title" label="Title" class="is-capitalized">
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label">
                  {{ column.label }}
                </b-tooltip>
              </template>

              <template
                slot="searchable"
                slot-scope=" {column} ">
                <b-input 
                  v-model="searchTerm"
                  type="search" icon-right="magnify" size="is-small"
                  placeholder="Search...">
                </b-input>
              </template>
              {{ props.row.title }}
            </b-table-column>

            <b-table-column field="tableData.category" label="Category">
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label">
                  {{ column.label }}
                </b-tooltip>
              </template>
              {{ props.row.category.name }}
            </b-table-column>

            <b-table-column field="tableData.createdAt" label="Created">
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
          label: 'Title',
          searchable: true
        },
        {
          field: 'category',
          label: 'Category'
        },
        {
          field: 'createdAt',
          label: 'Published'
        }
      ],
      currentPage: 1,
      perPage: 3,
      paginationPosition: 'bottom',
      featuredPostID: null,
      searchTerm: ''
    }
  },
  computed: {
    ...mapGetters({tableData : "getUserPosts"}),
    filteredTableData() {
      if (this.tableData) {
              return this.tableData.filter( item => {
        return item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      })
      }
    }
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
      return formatDate(date, "DD/MM/YYYY");
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

.searchPosts {
  margin-bottom: 2rem;
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

@media only screen and (min-width: 1000px) {
  .posts-table-content {
    grid-gap: 20px;
  }

  .searchPosts {
    margin-bottom: 1rem;
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
