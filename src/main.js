import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {messages} from './components/common/i18n';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;  // allow cookies to be carried across domains

Vue.use(ElementUI, {
    size: 'small',
    locale
})

const i18n = new VueI18n({
    locale: 'en',
    messages
});

new Vue({
    router,
    store,
    i18n,
    el: '#app',
    render: h => h(App)
}).$mount('#app')
