<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span>Posts / </span> 
        <span class="dashboard-breadcrumbs-current">Edit</span>
      </p>
    </nav>    
    
    <div class="dashboard-newPost-content">
      <validationObserver ref="form" v-slot=" {handleSubmit} ">
        <form class="add-post-form" enctype="multipart/form-data" v-if="post" @key-up.enter.prevent="handleSubmit(editPost)">

          <b-tabs v-model="activeStep" position="is-centered" type="is-toggle">
            <b-tab-item label="Step 1">
            
              <div class="stepOne my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Title, Summary &amp; Tags</p>
                <div class="my-step-content">
                  <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="post.title" placeholder="Example Title ..." horizontal label="Title"/>
                  <BInputWithValidation rules="required|min:5|max:150" v-model="post.summary" placeholder="The future of the..." horizontal label="Summary"/>

                  <b-field horizontal label="Tags">
                    <b-taginput v-model="post.tags" ellipsis maxtags="6" placeholder="Technology, Survival, Cooking" class="is-primary">
                    </b-taginput>
                  </b-field>  
                </div>
              </div>
            </b-tab-item>
            <b-tab-item label="Step 2">
              
              <div class="stepTwo my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Upload Image</p>
                <div class="my-step-content stepTwo-content">
                  
                  <figure class="image">
                    <img :src="post.image"></img>
                  </figure>

                  <b-field>
                      <b-upload v-model="image">
                        <b-button tag="a" class="is-primary" icon-left="arrow-up" outlined >Upload</b-button>
                      </b-upload>
                  </b-field>  

                </div>        
              </div>
            </b-tab-item>

            <b-tab-item label="Step 3"> 

              <div class="stepThree my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Content &amp; Submit</p>

                <div class="my-step-content stepThree-content">
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
                  <div class="stepThree-content-buttons">
                    <b-button class="">Full Screen Editor</b-button>
                    <b-button expanded class="is-primary" @click.prevent="handleSubmit(editPost)">Update</b-button>
                  </div>
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
          <div class="step-navigation">

            <b-button class="my-step-buttons" @click="prevStep"> <b-icon icon="chevron-left"></b-icon> </b-button>
            <b-button class="my-step-buttons" @click="nextStep"> <b-icon icon="chevron-right"></b-icon> </b-button>
          </div>
        </form>
      </validationObserver>
      



    </div>
        

  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import FormData from "form-data";
import PostsService from "@/services/PostsService";
import { ValidationObserver } from 'vee-validate';
import * as validationRules from '@/helpers/validation';
import BInputWithValidation from '@/buefyComponents/BInputWithValidation';
import { sanitizeTitle } from '@/helpers/helpers';

export default {
  data: function() {
    return {
      post: null,
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
  mounted () {
    this.getPost();
  },
  methods: {
    async getPost() {
      console.log("AYYYY");
      console.log(this.$route.params);
      this.postID = this.$route.params.postID;
      console.log(this.postID);
      console.log("AYYYY");
      const response = await PostsService.fetchSinglePostByID(this.postID);
      console.log(response.data);
      console.log('LL')
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
          this.activeStep = 0;
        }
        console.log('new post ERROR: ', response.data);
      } else if (response.status === 200){
        console.log(response.data.message);
        this.$router.push({ path: '/dashboard/posts/all'});
      }
    },


    prevStep() {
      if (this.activeStep > 0) this.activeStep = this.activeStep - 1;
    },
    nextStep() {
      if (this.activeStep <= 1) this.activeStep = this.activeStep + 1;
    }
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
  components: {
    quillEditor,
    ValidationObserver,
    BInputWithValidation
  }
}

</script>