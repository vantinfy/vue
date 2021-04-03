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

// import axios from 'axios' // 可在组件中这样引入，这样的话其直接使用axios.get等方法就不需要用this.$前缀
import axios from './api/config'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

// 富文本编辑器
// import { Quill, VueQuillEditor } from 'vue-quill-editor'
import VueQuillEditor from 'vue-quill-editor'
// import quillEmoji from 'quill-emoji'
// import 'quill-emoji/dist/quill-emoji.css' // quill的emoji表情
// Quill.register('modules/quillEmoji', quillEmoji)
import 'quill/dist/quill.core.css' // 引入富文本css
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 富文本编辑器添加实例
Vue.use(VueQuillEditor /*, { default global options } */ );

// v-emoji表情
import VEmojiPicker from "v-emoji-picker";
Vue.use(VEmojiPicker);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // console.log(to.matched[0], to.matched[0].components.default.methods)
    setTimeout(() => {
            // console.log("wake")
            next()
        }, Math.random() * 900 + 100) // 随机延迟时间：0.1-1秒
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')