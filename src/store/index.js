import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import articles from './articles'
import spacelist from './spacelist'
import search from './search'
import manage from './manage'
import notice from './notice'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users, //用户模块
        articles, //帖子
        spacelist,
        search,
        manage,
        notice,
    }
})