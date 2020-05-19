<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span>Posts / </span> 
        <span class="dashboard-breadcrumbs-current">New</span>
      </p>
    </nav>    
    
    <div class="dashboard-newPost-content">
      <validationObserver ref="form" v-slot=" {handleSubmit} ">
        <form class="add-post-form" enctype="multipart/form-data" @key-up.enter.prevent="handleSubmit(addPost)">

          <b-tabs v-model="activeStep" position="is-centered" type="is-toggle">
            <b-tab-item :label="`Step 1`">
            
              <div class="stepOne my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Title, Summary &amp; Tags</p>
                <div class="my-step-content">
                  
                  <b-field v-if="categories" class="select-category" label="Category" horizontal>
                    <b-select placeholder="Category" expanded v-model="category">
                      <template v-for="(category, i) in categories" >
                        <option :value="category" :key="i">{{category.title}}</option>
                      </template>
                    </b-select>
                  </b-field>
                    
                  <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="title" placeholder="Example Title ..." horizontal label="Title"/>
                  <BInputWithValidation rules="required|min:5|max:150" v-model="summary" placeholder="The future of the..." horizontal label="Summary"/>

                  <b-field horizontal label="Tags">
                    <b-taginput v-model="tags" ellipsis maxtags="6" placeholder="Technology, Survival, Cooking">
                    </b-taginput>
                  </b-field>  


                </div>
              </div>
            </b-tab-item>
            <b-tab-item :label="`Step 2`" v-if="(category) && (category.hasMedia === true)">
              
              <div class="stepTwo my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Upload Image</p>
                <div class="my-step-content stepTwo-content">

                  <b-field>
                      <b-upload v-model="image"
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
            </b-tab-item>

            <b-tab-item :label="lastStep"> 

              <div class="stepThree my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Content &amp; Submit</p>

                <div class="my-step-content stepThree-content">
                  <div>
                    <quill-editor
                      v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      class="contentArea"
                    ></quill-editor>
                  </div>
                  <div class="stepThree-content-buttons">
                    <b-button class="">Full Screen Editor</b-button>
                    <b-button expanded class="is-primary" @click.prevent="handleSubmit(addPost)">Create Post</b-button>
                  </div>
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
        </form>
      </validationObserver>
      

      <div class="my-step-navigation">

        <b-button class="my-step-buttons" @click="prevStep"> <b-icon icon="chevron-left"></b-icon> </b-button>
        <b-button class="my-step-buttons" @click="nextStep"> <b-icon icon="chevron-right"></b-icon> </b-button>
      </div>


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
      categories: null,
      title: null,
      summary: null,
      category: null,
      content: null,
      tags: null,
      image: null,
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
    this.getCategories();
  },
  methods: {
    async getCategories() {
      console.log('INSIDE CATEGORIES . VUE');
      const response = await PostsService.fetchCategories();
      if (response.status !== 200) console.log('CATEGORY PROBLEM!!');
      else if (response.status === 200){
        this.categories = response.data;
      }
    },
    async addPost() {

      this.tags = this.tags.slice(0, 6);

      const response = await PostsService.addPosts({
        category: this.category._id,
        title: this.title.trim(),
        summary: this.summary,
        image: this.image,
        content: this.content,
        tags: this.tags
      });

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
        this.$router.push({ name: "BlogPost", params: {title: sanitizeTitle(response.data.title)} });
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
    lastStep () {
      if ((this.categories) && (this.category) && (this.category.hasMedia === true)) return `Step 3`;
      else return `Step 2`;
    }
  },
  components: {
    quillEditor,
    ValidationObserver,
    BInputWithValidation
  }
}

</script>
<style lang="scss">

@import '@/styles/dashboardSteps.scss';

</style>