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
axios.defaults.withCredentials = true

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

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register' || to.path === '/passwordRecovery'
        || to.path === '/welcome' || to.path === '/' || to.path === '/mock/index'
        || to.path === '/404' || to.path === '/401') {
        next()
    } else {
        // get userMsg (in string format) from sessionStorage
        const strUserMsg = sessionStorage.getItem("userMsg");
        // parse userMsg (string format) to object
        const objectUserMsg = JSON.parse(strUserMsg);
        console.log(strUserMsg)
        if (objectUserMsg.account.userId === '') {
            Vue.prototype.$message.warning('Warning, please login first')
            next({path: '/login'})
        } else if (objectUserMsg.account.type === 'administrator' && !to.path.startsWith('/admin')
            || objectUserMsg.account.type === 'professor' && !to.path.startsWith('/professor')
            || objectUserMsg.account.type === 'student' && !to.path.startsWith('/student') && !to.path.startsWith('/studentCourse')) {
            Vue.prototype.$message.warning('Warning, you are not authorized to this page')
            next({path: '/401'})
        } else {
            next()
        }
    }
});

new Vue({
    router,
    store,
    i18n,
    el: '#app',
    render: h => h(App)
}).$mount('#app')


// main.js
function formatDate(date, fmt) {
    date = new Date(date);
    if (typeof(fmt) === "undefined") {
        fmt = "yyyy-MM-dd HH:mm:ss";
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt
};

//定义一个时间过滤器
Vue.filter("FormatDate", function(date, fmt) {
    return formatDate(date, fmt);
});
