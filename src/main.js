import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Header from '@components/views/header.vue';

import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;

Vue.component('v-header', Header);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
