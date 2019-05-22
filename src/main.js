import Vue from 'vue'
import App from './App.vue'
import vueRichEditor from './index';
Vue.use(vueRichEditor)
new Vue({
  el: '#app',
  render: h => h(App)
})
