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
      <!-- <validationObserver ref="form" v-slot=" {handleSubmit} "> -->
      <validationObserver ref="form" v-slot="form">
        <form class="add-post-form" enctype="multipart/form-data" @key-up.enter.prevent="addPost">

          <b-tabs v-model="activeStep" position="is-centered" type="is-toggle">
            <b-tab-item :label="`Step 1`">
            
              <div class="stepOne my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Title, Summary &amp; Tags</p>
                <div class="my-step-content">

                  <BSelectWithValidation rules="required" horizontal label="Category" v-model="category">
                      <option value>None</option>
                      <template v-for="(category, i) in categories" >
                        <option :value="category" :key="i" class="is-capitalized">{{category.name}}</option>
                      </template>
                  </BSelectWithValidation>
                    
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
                <div v-if="!imagePreview" class="my-step-content stepTwo-content">

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

                <div v-else class="my-step-content stepTwo-content">
                  
                  <figure class="stepTwo-image">
                    <img :src="imagePreview" />
                  </figure>

                  <b-field>
                      <b-upload v-model="image">
                        <b-button tag="a" class="is-primary" icon-left="arrow-up" outlined >Upload</b-button>
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
                      class="actualContentWrapper"
                    ></quill-editor>
                  </div>
                  <div class="stepThree-content-buttons">
                    <b-button @click="enlargeEditor">Full Screen Editor</b-button>
                    <b-button expanded class="is-primary" @click.prevent="addPost">Create Post</b-button>
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
import BSelectWithValidation from '@/buefyComponents/BSelectWithValidation';
import FullscreenEditor from '@/components/dashboard/FullscreenEditor';
import { sanitizeTitle } from '@/helpers/helpers';
import { mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      title: null,
      summary: null,
      category: null,
      content: null,
      tags: null,
      image: null,
      imagePreview: null,
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
  methods: {
    async addPost() {


      this.$refs.form.validate().then(async success => {

        if (!success) {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'You entered something wrong. Please review your inputs',
            type: 'is-danger'
          });

          this.activeStep = 0;

          return;
        }

        if ((this.tags === null ) || (this.tags.length === 0)){

          this.$buefy.toast.open({
            duration: 5000,
            message: 'Tags cannot be empty',
            type: 'is-danger'
          });

          this.activeStep = 0;

          return;
        }

        if ((this.content === null ) || (this.content === '') || (this.content === ' ')){
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Content cannot be empty',
            type: 'is-danger'
          });

          return;
        }

        if ((this.image === null) && (this.category.name.toLowerCase() === 'article')){

          this.$buefy.toast.open({
            duration: 5000,
            message: `An article must have an image`,
            type: 'is-danger'
          });

          this.activeStep = 1;

          return;
        }

        if ((this.category.hasMedia === false) && (this.image !== null)) {
          this.image = null;
        }
        
        this.tags = this.tags.slice(0, 6);

        let newPost = {
          category: this.category._id,
          title: this.title.trim(),
          summary: this.summary,
          content: this.content,
          tags: this.tags
        };

        if (this.image) newPost.image = this.image;
        const response = await PostsService.addPosts(newPost);

        if (response.status !== 200) {

          this.$buefy.toast.open({
            duration: 5000,
            message: response.data.message,
            type: 'is-danger'
          });

          if (response.data.field === 'title') {
            this.$refs.form.setErrors({
              title: response.data.message
            });
            this.activeStep = 0;
          }

        } else if (response.status === 200){

          this.$buefy.toast.open({
            duration: 3000,
            message: 'Post created!',
            type: 'is-success'
          });

          this.$router.push({ name: "BlogPost", params: {title: sanitizeTitle(response.data.title)} });
        }


      });
    },
    prevStep() {
      if (this.activeStep > 0) this.activeStep = this.activeStep - 1;
    },
    nextStep() {
      if (this.activeStep <= 1) this.activeStep = this.activeStep + 1;
    },
    enlargeEditor() {
      this.$buefy.modal.open({
        parent: this,
        component: FullscreenEditor,
        trapFocus: true,
        fullScreen: true,
        props: {content: this.content}
      });
    }
  },
  computed: {
    ...mapGetters({categories : 'getCategories', fullscreenContent: 'getFullscreenContent'}),
    lastStep () {
      if ((this.categories) && (this.category) && (this.category.hasMedia === true)) return `Step 3`;
      else return `Step 2`;
    }
  },
  watch: {
    image: function (val) {
      if (this.image !== null) {
        let reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = () => {
          this.imagePreview = reader.result;
        }
      }
    },
    fullscreenContent: function (val) {
      this.content = val;
    }
  },
  components: {
    quillEditor,
    ValidationObserver,
    BInputWithValidation,
    BSelectWithValidation,
    FullscreenEditor
  }
}

</script>
<style lang="scss">

@import '@/styles/dashboardSteps.scss';

</style>