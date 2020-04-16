<template>
  <div class="create-posts">


        <b-steps v-model="activeStep" size="is-small">
            <template v-for="(step, index) in baseSteps">
                <b-step-item
                    v-if="step.displayed"
                    :key="index"
                    :label="step.label">

                  <!-- <p class="has-text-centered">Skip any fields or steps you don't want to change.</p> -->
                                        
                  <validationObserver ref="form" v-slot=" {handleSubmit} ">
                    <form class="add-post-form" enctype="multipart/form-data" @key-up.enter.prevent="handleSubmit(editPost)">

                      <div class="stepOne my-step-wrapper" v-if="index === 0">
                        <p class="subtitle is-size-5 has-text-centered">Title, Summary &amp; Tags</p>
                        <div class="my-step-content">
                          <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="post.title" placeholder="Title" name="Title"/>
                          <BInputWithValidation rules="required|min:5|max:150" v-model="post.summary" placeholder="Summary" name="Summary"/>

                          <b-field>
                            <b-taginput v-model="post.tags" ellipsis maxtags="6" placeholder="Add a tag" class="is-primary">
                            </b-taginput>
                          </b-field>  
                        </div>
                      </div>

                      <div class="stepTwo my-step-wrapper" v-if="index === 1">
                        <p class="subtitle is-size-5 has-text-centered">Change Image?</p>
                        <div class="my-step-content stepTwo-content">

                            <img class="is-rounded my-edit-post-image" :src="post.image">


                          <b-field>
                              <b-upload v-model="newImage"
                                drag-drop>
                                  <section class="section">
                                      <div class="content has-text-centered">
                                          <p>
                                              <b-icon
                                                  icon="upload"
                                                  size="is-large">
                                              </b-icon>
                                          </p>
                                          <p>Drop your files here or click to upload</p>
                                      </div>
                                  </section>
                              </b-upload>
                          </b-field>  

                        </div>        
                      </div>



                      <div class="stepThree my-step-wrapper" v-if="index === 2">
                        <p class="subtitle is-size-5 has-text-centered">Content &amp; Submit</p>

                        <div class="my-step-content">
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
                        </div>
                      </div>

                    </form>
                  </validationObserver>
                </b-step-item>
            </template>
        </b-steps>

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
      newImage: null,
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
      },
      activeStep: 0
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
  computed: {
    baseSteps() {
      return [{
        label: 'Step One',
        displayed: true
      },
      {
        label: 'Step Two',
        displayed: true
      },
      {
        label: 'Step Three',
        displayed: true
      }]
    }
  },
  methods: {
    async getPost() {
      this.postID = this.$route.params.postID;
      console.log(this.$route.params.postID);
      console.log(this.postID);
      const response = await PostsService.fetchSinglePostByID(this.postID);
      this.post = response.data;
      console.log(this.post);
    },

    async editPost() {
      this.tags = this.tags.slice(0, 6);

      const editPostParams = {
        id: this.postID,
        title: this.post.title.trim(),
        summary: this.post.summary,
        content: this.post.content,
        tags: this.post.tags
      }

      if (this.newImage) editPostParams.image = this.newImage;

      const response = await PostsService.editPost(editPostParams);

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

  // div input,
  // div textarea,
  // div button {
  //   width: 100%;
  // }
}

.my-step-wrapper {
  // background: red;
  padding: 2rem 0;
  display: grid;
}

.my-step-content {
  display: grid;
  grid-gap: 15px;
}

.step-navigation {
  display: grid;
  justify-content: center;
  grid-template-columns: max-content max-content;
}

.my-figure, .my-upload-button {
  display: grid;
  justify-content: center;
  justify-items: center;
}

.my-figure {
    width: 300px;
    margin: 0 auto;
}

.my-edit-post-image {
  width: 300px;
  max-width: 100%;
  max-height: 100%;
}

.stepTwo-content {
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-self: center;
}

@media only screen and (min-width: 770px) {
  .stepTwo-content {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
}

@media only screen and (min-width: 1200px) {

}

@media only screen and (min-width: 1600px) {

}
</style>
