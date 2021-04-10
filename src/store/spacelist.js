import router from '../router/index'
import axios from 'axios'

export default {
    state: {
        post: true,
        draft: false,
        comment: false,
        book: false,
        follow: false,
        fans: false,
        msg: false,
        activeName: 'system_notice',
        articlelist: null
    },
    getters: {
        // setName:state => {
        //     // state.activeName = val
        //     return state.activeName
        // }
    },
    mutations: {
        myPost(state, payload) {
            // const { commit, dispatch, state, rootState } = store
            // console.log("rootState.token+++++++++++>>>>>>", payload)
            state.book = false;
            state.draft = false;
            state.comment = false;
            state.follow = false;
            state.fans = false;
            state.msg = false;
            if (state.post != true)
                state.post = !state.post;
            // console.log(router.currentRoute.params.list)
            if (router.currentRoute.params.list != "postlist" || router.currentRoute.path.split("/")[1] == "visit") {
                // axios.get('http://localhost:8090/user/getspace', {
                //         params: {
                //             uid: payload.token.uid,
                //             username: payload.token.name,
                //         }
                //     })
                // .then(res => {
                //     console.log(res)
                //     state.articlelist = res.data.articlelist
                // })
                let path
                if (payload.visit) {
                    path = '/visit/' + payload.token.uid + '/postlist'
                } else {
                    path = '/userspace/' + payload.token.uid + '/postlist'
                }
                router.push(path)
            }
            // console.log("---",state.list);
            // state.list[0] = !state.list[0];
        },
        myDraft(state, payload) {
            state.post = false;
            state.comment = false;
            state.follow = false;
            state.fans = false;
            state.msg = false;
            state.book = false;
            if (state.draft != true)
                state.draft = !state.draft;
            if (router.currentRoute.params.list != "draft" || router.currentRoute.path.split("/")[1] == "visit") {
                let path
                if (payload.visit) {
                    path = '/visit/' + payload.token.uid + '/draftlist'
                } else {
                    path = '/userspace/' + payload.token.uid + '/draftlist'
                }
                router.push(path)
            }
        },
        myComment(state, payload) {
            state.post = false;
            state.follow = false;
            state.fans = false;
            state.msg = false;
            state.book = false;
            state.draft = false;
            if (state.comment != true)
                state.comment = !state.comment
            if (router.currentRoute.params.list != "comment" || router.currentRoute.path.split("/")[1] == "visit") {
                let path
                if (payload.visit) {
                    path = '/visit/' + payload.token.uid + '/commentlist'
                } else {
                    path = '/userspace/' + payload.token.uid + '/commentlist'
                }
                router.push(path)
            }
        },
        myBook(state, payload) {
            state.post = false;
            state.draft = false;
            state.comment = false;
            state.follow = false;
            state.fans = false;
            state.msg = false;
            if (state.book != true)
                state.book = !state.book;
            if (router.currentRoute.params.list != "booklist" || router.currentRoute.path.split("/")[1] == "visit") {
                let path
                if (payload.visit) {
                    path = '/visit/' + payload.token.uid + '/booklist'
                } else {
                    path = '/userspace/' + payload.token.uid + '/booklist'
                }
                router.push(path)
            }
        },
        myFollow(state, payload) {
            state.book = false;
            state.draft = false;
            state.comment = false;
            state.post = false;
            state.fans = false;
            state.msg = false;
            if (state.follow != true)
                state.follow = !state.follow;
            if (router.currentRoute.params.list != "followlist") {
                let path
                if (payload.visit) {
                    path = '/visit/' + payload.token.uid + '/followlist'
                } else {
                    path = '/userspace/' + payload.token.uid + '/followlist'
                }
                router.push(path)
            }
        },
        myFans(state, payload) {
            state.book = false;
            state.follow = false;
            state.comment = false;
            state.post = false;
            state.draft = false;
            state.msg = false;
            if (state.fans != true)
                state.fans = !state.fans;
            if (router.currentRoute.params.list != "fanslist") {
                let path
                if (payload.visit) {
                    path = '/visit/' + payload.token.uid + '/fanslist'
                } else {
                    path = '/userspace/' + payload.token.uid + '/fanslist'
                }
                router.push(path)
            }
        },
        myMessage(state, payload) {
            state.book = false;
            state.follow = false;
            state.comment = false;
            state.fans = false;
            state.draft = false;
            state.post = false;
            if (state.msg != true)
                state.msg = !state.msg;
            if (state.activeName != payload.type)
                state.activeName = payload.type
                // this.setName(payload.type)
                // this.getters.setName(state,payload.type)
                // if(router.currentRoute.params.list.split("&")[1] != payload.type){
            if (router.currentRoute.params.list != payload.type) {
                // let path = '/userspace/' + payload.token.uid +'/msg&' + payload.type
                let path = '/userspace/' + payload.token.uid + '/' + payload.type
                router.push(path)
            }
        },
        setActiveName(state, payload) {
            state.activeName = payload
        }
    },
    actions: {
        getMySpace(store, config = {}) {
            const { commit, dispatch, state, rootState } = store
            console.log(rootState.users.token) //可以跨模块修改token
        }
    }
}