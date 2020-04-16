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
            <b-tab-item label="Step 1">
            
              <div class="stepOne my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Title, Summary &amp; Tags</p>
                <div class="my-step-content">
                  <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="title" placeholder="Example Title ..." horizontal label="Title"/>
                  <BInputWithValidation rules="required|min:5|max:150" v-model="summary" placeholder="The future of the..." horizontal label="Summary"/>

                  <b-field horizontal label="Tags">
                    <b-taginput v-model="tags" ellipsis maxtags="6" placeholder="Technology, Survival, Cooking" class="is-primary">
                    </b-taginput>
                  </b-field>  
                </div>
              </div>
            </b-tab-item>
            <b-tab-item label="Step 2">
              
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

            <b-tab-item label="Step 3"> 

              <div class="stepThree my-step-wrapper">
                <p class="subtitle is-size-5 has-text-centered">Content &amp; Submit</p>

                <div class="my-step-content stepThree-content">
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
                  <div class="stepThree-content-buttons">
                    <b-button class="">Full Screen Editor</b-button>
                    <b-button expanded class="is-primary" @click.prevent="handleSubmit(addPost)">Update</b-button>
                  </div>
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
        </form>
      </validationObserver>
      

      <div class="step-navigation">

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
      title: null,
      summary: null,
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
<style lang="scss">

// .add-post-form {
//   display: grid;
//   justify-items: center;
//   justify-content: center;
// }

.ql-editor {
  min-height: 100px;
}

.my-step-wrapper {
  // background: red;
  padding: 0.5rem 0;
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

// .my-step-buttons {
//   box-sizing: border-box;
// }

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
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-self: center;
}

.stepThree-content {
}

.stepThree-content-buttons {
  display: grid;
  justify-content: center;
  grid-gap: 10px;
}

@media only screen and (min-width: 770px) {
  .stepTwo-content {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: 1fr;
  }
  .stepThree-content-buttons {
  }
}

@media only screen and (min-width: 1000px) {
  .ql-editor {
    max-height: 100px;
  }

  .stepThree-content-buttons {
    grid-template-columns: max-content max-content;
  }
}

@media only screen and (min-width: 1200px) {
  .ql-editor {
    max-height: 150px;
  }
  

}

@media only screen and (min-width: 1600px) {
  .my-step-wrapper {
    padding: 1rem 0;
  }
  .ql-editor {
    max-height: 250px;
  }
  .stepThree-content-buttons {
    grid-template-columns: 1fr;
  }
}

</style>