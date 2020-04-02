<template>
  <div class="posts-table">
    
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
</template>

<script>
import PostsService from "@/services/PostsService";
import moment from "moment";
import { serverBus } from '../main';
import { mapGetters } from 'vuex';

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
      perPage: 5,
      paginationPosition: 'bottom'
    }
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchUserPosts();
      this.$store.dispatch("SET_USER_POSTS", response.data.posts);
      // this.tableData = (response.data.posts);
    },

    sanitizeTitle: function(postTitle) {
      const myTitle = postTitle.replace(/\s+/g, "-").toLowerCase();
      return myTitle;
    },

    formatDate(date) {
      return moment(date).format('MMMM Do YYYY');
    },

    async deletePost(post) {
      if (post) {
       const res = await PostsService.deletePost(post);
        this.$store.dispatch("DELETE_USER_POST", post);       
      }
    },

    editPost(post){
      console.log('posttable.vue');
      serverBus.$emit('editPost', post);
    }
  },
  mounted () {
    this.getPosts();
  },
  computed: {
    ...mapGetters({tableData : "getUserPosts"})
  }
};
</script>


<style lang="scss">

</style>
