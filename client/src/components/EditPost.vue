<template>
  <div class="create-posts">
    <form class="add-post-form" enctype="multipart/form-data">
      <p>Edit your post ID: {{postID}}</p>
      <div>
        <input type="text" name="title" placeholder="Title" v-model="post.title">
      </div>

      <div>
        <input type="text" name="summary" placeholder="Summary" v-model="post.summary">
      </div>

      <b-field label="Add some tags to spice up your post">
        <b-taginput v-model="post.tags" ellipsis placeholder="Add a tag" class="is-primary">
        </b-taginput>
      </b-field>      

      <!-- <div>
        <uploadFile/>
      </div> -->

      <div>
        <quill-editor
          v-model="post.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          class="contentArea"
        ></quill-editor>
      </div>
      <div>
        <button class="button btn-action is-primary" @click.prevent="editPost">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import FormData from "form-data";
import { serverBus } from '../main';
import uploadFile from '@/components/uploadFile.vue';
import PostsService from "@/services/PostsService";


export default {
  data: function() {
    return {
      post: {},
      title: "",
      summary: "",
      content: "",
      tags: [],
      image: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  created() {
    serverBus.$on('fileSelected', (file) => {
      this.image = file;
    })
  },
  mounted () {
    this.getPost();
  },
  methods: {
    async getPost() {
      console.log("AOSHAOUDAHDUHSAID ", this.postID);
      const response = await PostsService.fetchSinglePostByID(this.postID);
      this.post = response.data;
      console.log(this.post);
      console.log(this.post.title);
    },
    async editPost() {
      await PostsService.editPost({
        id: this.postID,
        title: this.post.title.trim(),
        summary: this.post.summary,
        content: this.post.content,
        tags: this.post.tags
      });
    }
  },
  components: {
    quillEditor,
    uploadFile
  },
  props: ['postID']
};
</script>


<style lang="scss">
@import "../styles/app.scss";

.ql-container {
  min-height: 150px;
}

.create-posts {
  background: #ffffff;
}

.add-post-form {
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-gap: 20px;

  div input,
  div textarea,
  div button {
    width: 100%;
  }
  h2 {
    margin: 0;
  }
}


@media only screen and (min-width: 700px) {

}

@media only screen and (min-width: 1200px) {

}

@media only screen and (min-width: 1600px) {

}
</style>
