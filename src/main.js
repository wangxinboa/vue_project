import Vue from 'vue'
import App from './App.vue'
import router, { paths } from './router'
import store from './store'

import TemplatePage from './views/template/page/page.vue';

import ComponentDrawer from '@components/drawer/drawer.vue';
import ComponentTree from '@components/tree/tree.vue';

import './assets/iconfont/iconfont.css';

import './css/default_css.less';
import './css/icon_button.less';


Vue.config.productionTip = false;

Vue.component('v-page', TemplatePage);

Vue.component('c-drawer', ComponentDrawer);
Vue.component('c-tree', ComponentTree);

Vue.prototype.paths = paths;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
