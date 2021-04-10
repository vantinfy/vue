import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        meta: {
            title: 'acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Index.vue')
    },
    {
        path: '/article/:mode',
        meta: {
            title: '创作 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/NewArticle.vue')
    },
    {
        path: '/login',
        meta: {
            title: '登录 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/userspace/:uid/:list',
        meta: {
            title: '个人空间 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/UserSpace.vue')
    },
    {
        path: '/visit/:uid/:list',
        meta: {
            title: '访问 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Visit.vue')
    },
    {
        path: '/details/:tid',
        meta: {
            title: '详情 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Article.vue')
    },
    {
        path: '/management/:pane',
        meta: {
            title: '管理中心 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Management.vue')
    },
    {
        path: '/topic/:key',
        meta: {
            title: '话题 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Topic.vue')
    },
    {
        path: '/search/keyword=:val',
        meta: {
            title: '搜索 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Search.vue')
    },
    {
        path: '/search/keyword=',
        meta: {
            title: '搜索 - acg chat! (￣▽￣)ノ',
        },
        component: () =>
            import ('../views/Search.vue')
    },
    {
        path: '/:uid/forbid',
        meta: {
            title: '用户正在小黑屋... - acg chat!',
        },
        component: () =>
            import ('../views/Forbid.vue'),
    },
    {
        name: '404',
        path: '/notFound',
        meta: {
            title: '出错啦！- acg chat! ',
        },
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