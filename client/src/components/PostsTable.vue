<template>
  <div class="posts-table">
    <p>Manage your posts below</p>
    <b-table :data="tableData" :columns="columns" :paginated="true"
      :pagination-simple="true"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="paginationPosition"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">


    </b-table>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
import moment from "moment";


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
      // this.tableData = this.tableData.map(({ content, ...item}) => item);
      // this.tableData.createdAt = this.tableData.createdAt.map(item => moment(item).format('MMMM Do YYYY'));
      console.log(this.tableData);
    }
  },
  mounted () {
    this.getPosts();
  }
};
</script>


<style lang="scss">

</style>
