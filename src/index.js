import vueRichEditor from './components/index.vue'
const obj = {
  install (Vue, options) {
    Vue.component('vueRichEditor', vueRichEditor)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueRichEditor);
}
export default obj
