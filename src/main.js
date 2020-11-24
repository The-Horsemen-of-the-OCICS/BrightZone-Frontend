import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/icon.css';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.use(ElementUI, { locale, size: 'small'})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
