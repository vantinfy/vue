import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        // name: 'Home',
        component: () =>
            import ('../views/Index.vue')
    },
    {
        path: '/newArticle',
        component: () =>
            import ('../views/NewArticle.vue')
    },
    {
        path: '/login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/userspace/:uid/:list',
        component: () =>
            import ('../views/UserSpace.vue')
    },
    {
        path: '/visit/:uid/:list',
        component: () =>
            import ('../views/Visit.vue')
    },
    {
        path: '/article/:tid',
        component: () =>
            import ('../views/Article.vue')
    },
    {
        path: '/management/:pane',
        component: () =>
            import ('../views/Management.vue')
    },
    {
        path: '/topic/:key',
        component: () =>
            import ('../views/Topic.vue')
    },
    {
        path: '/search/keyword=:val',
        component: () =>
            import ('../views/Search.vue')
    },
    {
        path: '/search/keyword=',
        component: () =>
            import ('../views/Search.vue')
    },
    {
        path: '/:uid/forbid',
        component: () =>
            import ('../views/Forbid.vue'),
    },
    {
        name: '404',
        path: '/notFound',
        component: resolve => require(['../views/NotFound.vue'], resolve),
    },
    {
        path: '*', // 通配符，匹配所有路径，因此需要放到最后
        redirect: {
            name: "404"
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }), // 解决页面跳转后 新页面没有位于顶部的问题
    routes
})

// 捕获router.push异常，解决跳转相同路由时控制台输出err的问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

export default router