<template>
  <div class="create-posts">
    <div class="add-post-form">
      <h2 class>Create a Post</h2>

      <div>
        <input type="text" name="title" placeholder="Title" v-model="title">
      </div>

      <div>
        <input type="text" name="summary" placeholder="Summary" v-model="summary">
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
        <button class="button btn-action primary" @click.prevent="addPost">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import PostsService from "@/services/PostsService";

export default {
  data: function() {
    return {
      title: "",
      summary: "",
      content: "",
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
  methods: {
    async addPost() {
      await PostsService.addPosts({
        title: this.title,
        summary: this.summary,
        content: this.content
      });
      this.$router.push({ name: "Posts" });
    }
  },
  components: {
    quillEditor
  }
};
</script>


<style lang="scss">
@import "../styles/app.scss";

.create-posts {
  background: #ffffff;
}

.add-post-form {
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: grid;
  grid-gap: 20px;

  div input,
  div textarea,
  div button {
    width: 100%;
  }
}

// @media only screen and (min-width: 700px) {
//   .add-post-form {
//     width: 500px;
//   }
// }

// @media only screen and (min-width: 1200px) {
//   .add-post-form {
//     width: 1000px;
//   }
// }

// @media only screen and (min-width: 1600px) {

// }
</style>
