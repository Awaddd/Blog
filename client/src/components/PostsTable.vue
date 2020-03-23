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
          field: 'image',
          label: 'Image'
        }
      ],
      currentPage: 1,
      perPage: 5,
      paginationPosition: 'bottom'
    }
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();

      this.tableData = (response.data.posts);
      this.tableData = this.tableData.map(({ content, ...item}) => item);
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
