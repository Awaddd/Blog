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
                      <BInputWithValidation vid="title" rules="required|min:7|max:150"  placeholder="Title" name="Title"/>
                      <BInputWithValidation rules="required|min:5|max:150"  placeholder="Summary" name="Summary"/>

                      <b-field>
                        <b-taginput  ellipsis maxtags="6" placeholder="Add a tag" class="is-primary">
                        </b-taginput>
                      </b-field>  
                    </div>
                  </div>

                  <div class="stepTwo my-step-wrapper" v-if="index === 1">
                    <p class="subtitle is-size-5 has-text-centered">Change Image?</p>
                    <div class="my-step-content stepTwo-content">

                      <b-field>
                          <b-upload
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
                        <b-button expanded class="is-primary" @click.prevent="handleSubmit(editPost)">Update</b-button>
                      </div>
                    </div>
                  </div>

                </form>
              </validationObserver>
            </b-step-item>
        </template>
    </b-steps>
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
  mounted () {
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
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-self: center;
}

@media only screen and (min-width: 770px) {
  .stepTwo-content {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: 1fr;
  }
}
</style>