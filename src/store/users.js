import router from '../router/index'
import axios from 'axios'
import { Message } from 'element-ui'
import Vue from 'vue'

export default {
    state: {
        token: '',
        visitUser: '',
        uid: '',
        follow_fans_cnt: {
            follow_cnt: 0,
            fans_cnt: 0,
        },
        followlist: [],
        fanslist: [],
        usr: [{
            // 管理员
            name: "admin",
            pwd: "root",
            uid: '100001',
            reg_time: '2021-3-2',
            sex: 'secret',
            level: '2',
            sign: "啦啦啦",
            headUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            follow_cnt: '99',
            fans_cnt: '99',
            zan_cnt: '99999',
            book: ''
        }]
    },
    getters: {},
    mutations: {
        // 同步方法
        setFollowCnt(state, payload) {
            state.follow_fans_cnt.follow_cnt = payload
        },
        setFansCnt(state, payload) {
            state.follow_fans_cnt.fans_cnt = payload
        },
        setFollowlist(state, payload) {
            state.followlist = payload
        },
        setFanslist(state, payload) {
            state.fanslist = payload
        },
        subscribe(state, payload) { // 关注
            axios.get(Vue.prototype.api + 'user/subscribe', {
                params: {
                    follow_uid: payload.token.uid,
                    follow_name: payload.token.user_name,
                    be_follow_uid: payload.user.User.uid,
                    be_follow_name: payload.user.User.user_name
                }
            }).then(res => {
                if (!res.data.successFollow)
                    Message({
                        message: (res.data.msg),
                        type: 'warning'
                    }, true)
            })
        },
        unsubscribe(state, payload) { // 取消关注
            axios.get(Vue.prototype.api + 'user/unsubscribe', {
                params: {
                    uid: payload.token.uid,
                    target_uid: payload.user.User.uid,
                }
            })
        },
        correct(state, payload) { // 登录
            let params = new FormData();
            params.append("name", payload.name)
            params.append("password", payload.pwd)
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            axios.post(Vue.prototype.api + 'user/login', params, config)
                .then(function(res) {
                    // console.log(res)
                    if (res.data.isLogin) {
                        Message({
                            message: ("登录成功"),
                            type: 'success'
                        }, true)
                        state.token = res.data.user
                            // state.visitUser = res.data.user
                            // router.push('/')
                        router.go(-1) // 上面的直接跳转到根路径不妥，这里改成了回到登录前的上一页
                    } else {
                        Message({
                            message: ("用户名不存在或密码错误"),
                            type: 'error'
                        }, true)
                    }
                }).catch(function(error) {
                    console.log("can't find:---->", error);
                })
                // 校验登录信息
                // for (let index = 0; index < state.usr.length; index++) {
                //     if (payload.name == state.usr[index].name && payload.pwd == state.usr[index].pwd) {
                //         //登录成功，生成(带时间戳的)token
                //         // console.log(typeof(state.token),'---',state.usr[index].name,'typeof',typeof(state.usr[index].name))
                //         state.token = state.usr[index] //+ "-" + String(new Date().getTime())
                //         // console.log(state.token.name)
                //         router.push('/') //回到首页
                //         return
                //     }
                // }
                // alert("账号或密码错误")
        },
        isExist: (state, payload) => { // 注册——判断用户名是否存在
            let params = new FormData();
            params.append("name", payload.name)
            params.append("password", payload.pwd)
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            axios.post(Vue.prototype.api + 'user/register', params, config)
                .then(function(res) {
                    if (res.data.successRegister) {
                        Message({
                            message: (res.data.msg),
                            type: 'success'
                        }, true)
                    } else {
                        Message({
                            message: (res.data.msg),
                            type: 'error'
                        }, true)
                    }
                }).catch(function(error) {
                    console.log("can't find:---->", error);
                })

            // 注册时校验用户名是否重复
            // for (let index = 0; index < state.usr.length; index++) {
            //     if (payload.name == state.usr[index].name) {
            //         alert("账号名已存在")
            //         return false
            //             //用户已存在
            //     }
            // }
            // state.usr.push({ name: payload.name, pwd: payload.pwd })
            // alert("注册成功，可直接登录")
            // return true
        },
        clearToken(state) {
            //清除token——退出登录
            state.token = ''
            router.push('/') //回到首页
                // return state.token
        },
        updateToken(state, payload) { // 刷新用户信息token
            state.token = payload
        },
        updateVisitUser(state, payload) { // 刷新要访问对象的信息
            state.visitUser = payload
        },
    },
    actions: {
        // 异步方法
        visit(context, payload) {
            axios.get(Vue.prototype.api + "user/visitspace", {
                params: {
                    username: payload
                }
            }).then(res => {
                context.commit('updateVisitUser', res.data.visit_user)
                context.commit('myPost', { visit: true, token: context.state.visitUser })
            })
        }
    }
}