import Vue from 'vue'
import App from './App.vue'
import router, { paths } from './router'
import store from './store'

import PageTemplate from './views/template/page/page.vue';

import './assets/iconfont/iconfont.css';

import './default_css.less';

Vue.config.productionTip = false;

Vue.component('v-page', PageTemplate);

Vue.prototype.paths = paths;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
