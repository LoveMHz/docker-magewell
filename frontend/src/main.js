import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import axios from 'axios';
Vue.prototype.$http = axios;

Vue.prototype.$hostname = document.location.hostname;

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// Event Hub
Vue.prototype.$bus = new Vue({})

new Vue({
  render: h => h(App),
}).$mount('#app');
