<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span class="dashboard-breadcrumbs-current">Author</span>
      </p>
    </nav>   

    <div>
      <validationObserver ref="form" v-slot="form">
        <form class="update-author-page-form" enctype="multipart/form-data" v-if="post" @key-up.enter.prevent="updateAuthorPost">
          <div class="has-text-centered" style="margin-bottom: 1rem;">
            <h1 class="title is-size-4-mobile is-size-5-tablet is-size-4-desktop is-capitalized">Author Page</h1>
          </div>

          <BInputWithValidation vid="title" rules="required|min:7|max:150" v-model="post.title" placeholder="Example Title ..." label="Title" class="author-page-custom-label" />
          <BInputWithValidation v-model="post.summary" placeholder="The future of the..." label="Summary" class="author-page-custom-label" />

          <div class="update-author-page-form-content">
            <div class="field-label is-normal">
              <label style="margin-bottom: 0.4rem; text-align: left;" class="label author-page-custom-label" for="author-post-content">Content</label>
            </div>
            <quill-editor
              id="author-post-content"
              v-model="post.content"
              ref="myQuillEditor"
              :options="editorOption"
              class="actualContentWrapper"
            ></quill-editor>
          </div>

          <div class="author-page-form-buttons">
            <b-button @click="enlargeEditor" >Full Screen Editor</b-button>
            <b-button expanded class="is-primary" @click.prevent="updateAuthorPost">Update</b-button>
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
import AuthorService from "@/services/AuthorService";
import { ValidationObserver } from 'vee-validate';
import * as validationRules from '@/helpers/validation';
import BInputWithValidation from '@/buefyComponents/BInputWithValidation';
import BSelectWithValidation from '@/buefyComponents/BSelectWithValidation';
import FullscreenEditor from '@/components/dashboard/FullscreenEditor';
import { mapGetters } from 'vuex';

export default {
  components: {
    ValidationObserver,
    BInputWithValidation
  },
  data () {
    return {
      category: null,
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
      }
    }
  },
  mounted () {
    this.getAuthorPost();
  },
  watch: {
    fullscreenContent: function (val) {
      this.post.content = val;
    }
  },
  methods: {
    async getAuthorPost() {
      const response = await AuthorService.getAuthorPost();
      if (response.status === 200) this.post = response.data;
    },
    async updateAuthorPost() {
      this.$refs.form.validate().then(async success => {
        if (!success) {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'You entered something wrong. Please review your inputs',
            type: 'is-danger'
          });

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

        const authorPostParams = {
          id: this.post._id,
          title: this.post.title.trim(),
          summary: this.post.summary,
          content: this.post.content,
        }

        const response = await AuthorService.updateAuthorPost(authorPostParams);

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
          }

        } else if (response.status === 200){

          this.$buefy.toast.open({
            duration: 3000,
            message: 'Author page updated!',
            type: 'is-success'
          });

          this.$router.push({ name: 'Author' });
        }

      })
    },
    enlargeEditor() {
      this.$buefy.modal.open({
        parent: this,
        component: FullscreenEditor,
        trapFocus: true,
        fullScreen: true,
        props: {content: this.post.content}
      })
    }
  },
  computed: {
    ...mapGetters({categories : 'getCategories', fullscreenContent: 'getFullscreenContent'})
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

.author-page-custom-label {
  .field {
    .label {
      font-weight: 600;
    }
  }
}

.update-author-page-form {
  display: flex;
  flex-direction: column;
}

.author-page-form-buttons {
  display: grid;
  justify-content: center;
  grid-gap: 10px;
  margin-top: 1.5rem;
}

@media only screen and (min-width: 1000px) {
  .update-author-page-form {
    grid-gap: 0.5rem;
  }

  .author-page-form-buttons {
    grid-template-columns: max-content max-content;
  }

  .update-author-page-form-content {
    .actualContentWrapper {
      .ql-editor {
        max-height: 100px;
      }
    }
  }

}

@media only screen and (min-width: 1600px) {
    
  .author-page-form-buttons {
    grid-template-columns: 1fr;
    margin-top: 0;
  }

  .update-author-page-form-content {
    .actualContentWrapper {
      .ql-editor {
        max-height: 150px;
      }
    }
  }

}


</style>