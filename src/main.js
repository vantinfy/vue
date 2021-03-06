import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../font_2448185_6hjnt1i3ew6/iconfont.css' //引入自定义图标样式
import './assets/css/index.css' // 全局css样式表

// 第三方包
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.prototype.$notify // 全局使用element-ui的notify组件

// import axios from 'axios' // 可在组件中这样引入，这样的话其直接使用axios.get等方法就不需要用this.$前缀
import axios from './api/config'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

// 绑定自定义全局变量——其实就是后台接口地址，用了typeof打印类型是字符串
import api from './components/Global.vue'
Vue.prototype.api = api.apiUrl;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // console.log(to.matched[0], to.matched[0].components.default.methods)
    // setTimeout(() => {
    //         // console.log("wake")
    //         next()
    //     }, Math.random() * 900 + 100) // 随机延迟时间：0.1-1秒
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')