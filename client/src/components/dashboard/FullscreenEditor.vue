<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Fullscreen Editor</p>
    </header>
    <section class="modal-card-body">
      <quill-editor
        v-model="fullscreenContent"
        ref="myQuillEditor"
        :options="editorOption"
        class="fullscreenEditor"
      ></quill-editor>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" type="button" @click="updateContent">Finish</button>
    </footer>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";

export default {
  props: ['content'],
  methods: {
    updateContent() {
      this.$parent.close();
      this.$store.dispatch('SET_FULLSCREEN_CONTENT', this.fullscreenContent);
    }
  },
  data () {
    return {
      fullscreenContent: this.content,
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
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss">

.fullscreenEditor {
  .ql-container {
    .ql-editor {
      height: 250px;
    }
  }
}

@media only screen and (min-width: 360px) {
  .fullscreenEditor {
    .ql-container {
      .ql-editor {
        height: 300px;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .fullscreenEditor {
    .ql-container {
      .ql-editor {
        height: 600px;
      }
    }
  }
}

@media only screen and (min-width: 1000px) {
  .fullscreenEditor {
    .ql-container {
      .ql-editor {
        height: 450px;
      }
    }
  }
}

@media only screen and (min-width: 1200px) {
  .fullscreenEditor {
    .ql-container {
      .ql-editor {
        height: 550px;
      }
    }
  }
}

@media only screen and (min-width: 1600px) {
  .fullscreenEditor {
    .ql-container {
      .ql-editor {
        height: 700px;
      }
    }
  }
}
</style>