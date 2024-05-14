import Vue from 'vue';
import App from './App.vue';
import router, { paths } from './router/router.js';
import store from './store/store.js';

import ComponentTextInput from '@components/text_input/text_input.vue';
import ComponentTree from '@components/tree/tree.vue';


import './default_css.css';
import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;

Vue.component('c-text_input', ComponentTextInput);
Vue.component('c-tree', ComponentTree);

// Vue.component('c-drawer', ComponentDrawer);
// Vue.component('c-tree', ComponentTree);

// Vue.prototype.paths = paths;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
