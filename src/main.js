import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './scss/base.scss';
import 'element-ui/lib/theme-chalk/index.css';

import registerElement from './utils/registerElement.js';
Vue.config.productionTip = false;

registerElement(Vue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
