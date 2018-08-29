import tinymce from './TinymceVue'

tinymce.install = function (Vue, option) {
  Vue.component(tinymce.name, tinymce)
}

export default tinymce
