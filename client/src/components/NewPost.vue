<template>
  <div class="create-posts">
    <form class="add-post-form" enctype="multipart/form-data">
      <p><strong>Create a post below</strong></p>
      <div>
        <input type="text" name="title" placeholder="Title" v-model="title">
      </div>

      <div>
        <input type="text" name="summary" placeholder="Summary" v-model="summary">
      </div>


      <b-field >
        <b-taginput v-model="tags" ellipsis maxtags="6" placeholder="Add a tag">
        </b-taginput>
      </b-field>      

      <div>
        <uploadFile/>
      </div>

      <div>
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          class="contentArea"
        ></quill-editor>
      </div>
      <div>
        <button class="button btn-action is-primary" @click.prevent="addPost">Add</button>
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
  methods: {
    async addPost() {

      this.tags = this.tags.slice(0, 6);

      const response = await PostsService.addPosts({
        title: this.title.trim(),
        summary: this.summary,
        image: this.image,
        content: this.content,
        tags: this.tags
      });

      if (response.status !== 200) {
        console.log('new post ERROR: ', response.data);
      } else if (response.status === 200){
        console.log(response.data.message);
        this.$router.push({ name: "Home" });
      }
    }
  },
  components: {
    quillEditor,
    uploadFile
  }
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
