<template>
  <div class="posts-table">
    
    <template>
      <b-table :data="tableData"
      :paginated="true"
      :pagination-simple="true"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="paginationPosition"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      hoverable
      >
        <template slot-scope="props">

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
            <!-- <button class="button is-small is-success">Edit</button>
            <button class="button is-small is-danger">Delete</button> -->

            <div class="field is-grouped">
              <p class="control">
                <b-button type="is-info" icon-right="delete" @click="editPost(props.row._id)" />
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

export default {
  data: function() {
    return {
      tableData: [
        
      ],
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

      this.tableData = (response.data.posts);
      console.log(this.tableData);
    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY');
    },
    async deletePost(post) {
      console.log(post);
      const res = await PostsService.deletePost(post);
      console.log(res);
    },
    editPost(post){
      console.log('posttable.vue');
      serverBus.$emit('editPost', post);
    }
  },
  mounted () {
    this.getPosts();
  }
};
</script>


<style lang="scss">

</style>
