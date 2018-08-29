<template>
  <div class="ise-tinymce">
      <textarea title="rich text" :id="id" :v-model="content"></textarea>
  </div>
</template>

<script>
import CN from './lang/zh_CN'
import skin from './skin'
export default {
  name: 'IseTinymce',
  props: {
    id: {
      type: String,
      default: '____ise_mce'
    },
    htmlClass: {default: '', type: String},
    value: {default: ''},
    plugins: {
      default: function () {
        return [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr'
        ]
      },
      type: Array
    },
    toolbar1: {
      default: 'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      type: String
    },
    toolbar2: {default: '', type: String},
    other_options: {
      default: function () {
        return {}
      },
      type: Object
    },
    readonly: {default: false, type: Boolean}
  },
  data () {
    return {
      content: '',
      editor: null,
      cTinyMce: null,
      checkerTimeout: null,
      isTyping: false,
      that: ''
    }
  },
  mounted () {
    const tinymce = require('tinymce/tinymce.min')

    // A theme is also required
    require('tinymce/themes/modern/theme')

    // Any plugins you want to use has to be imported
    require('tinymce/plugins/advlist')
    require('tinymce/plugins/wordcount')
    require('tinymce/plugins/autolink')
    require('tinymce/plugins/autosave')
    require('tinymce/plugins/charmap')
    require('tinymce/plugins/codesample')
    require('tinymce/plugins/contextmenu')
    require('tinymce/plugins/emoticons')
    require('tinymce/plugins/fullscreen')
    require('tinymce/plugins/hr')
    require('tinymce/plugins/imagetools')
    require('tinymce/plugins/insertdatetime')
    require('tinymce/plugins/link')
    require('tinymce/plugins/media')
    require('tinymce/plugins/noneditable')
    require('tinymce/plugins/paste')
    require('tinymce/plugins/print')
    require('tinymce/plugins/searchreplace')
    require('tinymce/plugins/tabfocus')
    require('tinymce/plugins/template')
    require('tinymce/plugins/textpattern')
    require('tinymce/plugins/visualblocks')
    require('tinymce/plugins/anchor')
    require('tinymce/plugins/autoresize')
    require('tinymce/plugins/bbcode')
    require('tinymce/plugins/code')
    require('tinymce/plugins/colorpicker')
    require('tinymce/plugins/directionality')
    require('tinymce/plugins/fullpage')
    require('tinymce/plugins/help')
    require('tinymce/plugins/image')
    require('tinymce/plugins/importcss')
    require('tinymce/plugins/legacyoutput')
    require('tinymce/plugins/lists')
    require('tinymce/plugins/nonbreaking')
    require('tinymce/plugins/pagebreak')
    require('tinymce/plugins/preview')
    require('tinymce/plugins/save')
    require('tinymce/plugins/spellchecker')
    require('tinymce/plugins/table')
    require('tinymce/plugins/textcolor')
    require('tinymce/plugins/toc')
    require('tinymce/plugins/visualchars')
    require('tinymce/skins/lightgray/skin.min.css')
    CN(tinymce)
    this.content = this.value
    this.init()
    this.that = this
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  watch: {
    value: function (newValue) {
      if (!this.isTyping) {
        if (this.editor !== null) this.editor.setContent(newValue)
        else this.content = newValue
      }
    },
    readonly (value) {
      if (value) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }
    }
  },
  methods: {
    init () {
      console.log(this)
      console.log(this.that)
      console.log(this.tinymce)
      console.log(this.that.tinymce)
      let options = {
        selector: '#' + this.id,
        skin: false,
        toolbar1: this.toolbar1,
        toolbar2: this.toolbar2,
        plugins: this.plugins,
        init_instance_callback: this.initEditor,
        branding: false,
        paste_data_images: this.other_options.images_upload_handler ? true : false,
        automatic_uploads: false,
        paste_enable_default_filters: false,
        paste_filter_drop: false,
        file_picker_types: this.other_options.file_picker_callback ? 'file image media' : ''
      }
      if (typeof window !== 'undefined') {
        tinymce.init(this.concatAssciativeArrays(options, this.other_options))
      }
    },
    initEditor (editor) {
      this.editor = editor
      editor.setContent(this.content)
      editor.on('KeyUp', (e) => {
        this.submitNewContent()
      })
      editor.on('Change', (e) => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent()
        }
        this.$emit('editorChange', e)
      })
      editor.on('init', (e) => {
        editor.setContent(this.content)
        this.$emit('input', this.content)
      })
      if (this.readonly) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }
      let skinNode = editor.dom.create('style', {id: 'skin'}, skin)
      editor.getDoc().getElementsByTagName('head')[0].appendChild(skinNode)
      this.$emit('editorInit', editor)
    },
    concatAssciativeArrays (array1, array2) {
      if (array2.length === 0) return array1
      if (array1.length === 0) return array2
      let dest = []
      for (let key in array1) dest[key] = array1[key]
      for (let key in array2) dest[key] = array2[key]
      return dest
    },
    submitNewContent () {
      this.isTyping = true
      if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout)
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false
      }, 300)

      this.$emit('input', this.editor.getContent())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .ise-tinymce{
    .mce-menubar .mce-menubtn.mce-active {
      border-bottom: none;
      z-index: 65534;
    }
  }
</style>
