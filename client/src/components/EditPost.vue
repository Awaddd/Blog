<template>
  <div class="create-posts">
    <validationObserver ref="form" v-slot=" {handleSubmit} ">
      <form class="add-post-form" enctype="multipart/form-data" @key-up.enter.prevent="handleSubmit(editPost)">

        <p>Edit your post ID: {{postID}}</p>
        <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="post.title" placeholder="Title" name="Title"/>
        <BInputWithValidation rules="required|min:5|max:150" v-model="post.summary" placeholder="Summary" name="Summary"/>

        <b-field label="Add some tags to spice up your post">
          <b-taginput v-model="post.tags" ellipsis maxtags="6" placeholder="Add a tag" class="is-primary">
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
          <button class="button btn-action is-primary" @click.prevent="handleSubmit(editPost)">Update</button>
        </div>
      </form>
    </validationObserver>
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
import { ValidationObserver } from 'vee-validate';
import * as validationRules from '@/helpers/validation';
import BInputWithValidation from '@/buefyComponents/BInputWithValidation';

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
      const response = await PostsService.fetchSinglePostByID(this.postID);
      this.post = response.data;
      console.log(this.post);
    },

    async editPost() {
      this.tags = this.tags.slice(0, 6);

      const response = await PostsService.editPost({
        id: this.postID,
        title: this.post.title.trim(),
        summary: this.post.summary,
        content: this.post.content,
        tags: this.post.tags
      });

      if (response.status !== 200) {
        if (response.data.field === 'title') {
          this.$refs.form.setErrors({
            title: response.data.message
          });
        }
        console.log('new post ERROR: ', response.data);
      } else if (response.status === 200){
        console.log(response.data.message);
        this.$store.dispatch("SET_ACTIVE_DASHBOARD_TAB", 'allPosts');       
      }
    }

  },
  components: {
    quillEditor,
    uploadFile,
    ValidationObserver,
    BInputWithValidation
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
