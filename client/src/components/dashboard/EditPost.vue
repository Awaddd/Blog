<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span>Posts / </span> 
        <span class="dashboard-breadcrumbs-current">Edit</span>
      </p>
    </nav>    
    
    <div class="">
      <validationObserver ref="form" v-slot="form">
        <form class="add-post-form" enctype="multipart/form-data" v-if="post" @key-up.enter.prevent="editPost">

          <b-tabs v-model="activeStep" position="is-centered" type="is-toggle">
            <b-tab-item :label="`Step 1`">
            
              <div class="stepOne my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Title, Summary &amp; Tags</p>
                <div class="my-step-content">

                  <BSelectWithValidation v-model="post.category.name" horizontal label="Category">
                    <template v-for="(v, i) in categories">
                      <option :value="v.name" :key="i">{{v.name}}</option>
                    </template>
                  </BSelectWithValidation>

                  <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="post.title" placeholder="Example Title ..." horizontal label="Title"/>
                  <BInputWithValidation rules="required|min:5|max:150" v-model="post.summary" placeholder="The future of the..." horizontal label="Summary"/>

                  <b-field horizontal label="Tags">
                    <b-taginput v-model="post.tags" ellipsis maxtags="6">
                    </b-taginput>
                  </b-field>  
                </div>
              </div>
            </b-tab-item>
            <b-tab-item :label="`Step 2`" v-if="(category) && (category.hasMedia === true)">
              <div class="stepTwo my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Upload Image</p>

                <div v-if="(!post.image) && (!imagePreview)" class="my-step-content stepTwo-content">

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

                <div v-else class="my-step-content stepTwo-content">
                  
                  <figure class="stepTwo-image" v-if="post.image">
                    <img :src="post.image" />
                  </figure>
                  <figure class="stepTwo-image" v-else>
                    <img :src="imagePreview" />
                  </figure>

                  <b-field>
                      <b-upload v-model="newImage">
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
                      v-model="post.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      class="contentArea"
                    ></quill-editor>
                  </div>
                  <div class="stepThree-content-buttons">
                    <b-button class="">Full Screen Editor</b-button>
                    <b-button expanded class="is-primary" @click.prevent="editPost">Update</b-button>
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
import { mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      category: null,
      post: null,
      postID: null,
      newImage: null,
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
  mounted () {
    this.getPost();
  },
  watch: {
    'post.category.name': function() {
      const { [0] : category } = this.categories.filter( i => {
        if (i.name === this.post.category.name) return i;
      });
      this.category = category;
    },
    newImage: function (val) {
      if (this.newImage !== null) {
        let reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = () => {
          if ((this.post) && (this.post.image)) this.post.image = null;
          this.imagePreview = reader.result;
        }
      }
    }
  },
  methods: {
    async getPost() {
      this.postID = this.$route.params.postID;
      const response = await PostsService.fetchSinglePostByID(this.postID);
      if (response.status === 200) this.post = response.data;
    },

    async editPost() {
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

        if ((this.post.tags === null) || (this.post.tags.length === 0)){

          this.$buefy.toast.open({
            duration: 5000,
            message: 'Tags cannot be empty',
            type: 'is-danger'
          });

          this.activeStep = 0;

          return;

        }


        if ((this.post.content === null) || (this.post.content === '') || (this.post.content === ' ')){

          this.$buefy.toast.open({
            duration: 5000,
            message: 'Content cannot be empty',
            type: 'is-danger'
          });

          return;

        }


        if (((!this.post.image) && (this.newImage === null )) && (this.category.name.toLowerCase() === 'article')){

          this.$buefy.toast.open({
            duration: 5000,
            message: `An article must have an image`,
            type: 'is-danger'
          });

          this.activeStep = 1;

          return;
        } 


        this.post.tags = this.post.tags.slice(0, 6);

        const editPostParams = {
          id: this.postID,
          category: this.category._id,
          title: this.post.title.trim(),
          summary: this.post.summary,
          content: this.post.content,
          tags: this.post.tags
        }

        if ((this.category.hasMedia === false) && (this.post.image)){
          editPostParams.removeImage = true;
        }

        if ((this.category.hasMedia === false) && (this.newImage !== null)) {
          this.newImage = null;
          editPostParams.removeImage = true;
        }

        if (this.newImage) editPostParams.image = this.newImage;

        const response = await PostsService.editPost(editPostParams);

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
            message: 'Post updated!',
            type: 'is-success'
          });

          this.$router.push({ path: '/dashboard/posts/all'});
        }

      })
    },
    prevStep() {
      if (this.activeStep > 0) this.activeStep = this.activeStep - 1;
    },
    nextStep() {
      if (this.activeStep <= 1) this.activeStep = this.activeStep + 1;
    }
  },
  computed: {
    ...mapGetters({ categories : 'getCategories' }),
    lastStep () {
      if ((this.categories) && (this.category) && (this.category.hasMedia === true)) return `Step 3`;
      else return `Step 2`;
    }
  },
  components: {
    quillEditor,
    ValidationObserver,
    BInputWithValidation,
    BSelectWithValidation
  }
}

</script>

<style lang="scss">

@import '@/styles/dashboardSteps.scss';


</style>