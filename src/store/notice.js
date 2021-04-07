export default {
    state: {
        systemNotice: [],
        commentNotice: [],
        subscribeNotice: [],
        zanBookNotice: [],
        systemNoticeCnt: 0,
        commentNoticeCnt: 0,
        zanBookNoticeCnt: 0,
        subscribeNoticeCnt: 0,
    },
    mutations: {
        setSystemNotice(state, payload) {
            state.systemNotice = payload
        },
        setCommentNotice(state, payload) {
            state.commentNotice = payload
        },
        setZanBookNotice(state, payload) {
            state.zanBookNotice = payload
        },
        setSubscribeNotice(state, payload) {
            state.subscribeNotice = payload
        },
        add(state, payload) {
            if (payload == "sys")
                state.systemNoticeCnt++
                else if (payload == "com")
                    state.commentNoticeCnt++
                    else if (payload == "subs")
                        state.subscribeNoticeCnt++
                        else if (payload == "zbk")
                            state.zanBookNoticeCnt++
        },
        decrease(state, payload) {
            if (payload.type == "sys")
                state.systemNoticeCnt -= payload.change
            else if (payload.type == "com")
                state.commentNoticeCnt -= payload.change
            else if (payload.type == "zbk")
                state.zanBookNoticeCnt -= payload.change
            else if (payload.type == "subs")
                state.subscribeNoticeCnt -= payload.change
        },
        setZero(state, payload) {
            if (payload == "system_notice")
                state.systemNoticeCnt = 0
            else if (payload == "comment_notice")
                state.commentNoticeCnt = 0
            else if (payload == "subscribe_notice")
                state.subscribeNoticeCnt = 0
            else if (payload == "zan_book_notice")
                state.zanBookNoticeCnt = 0
            else if (payload == "all") {
                state.systemNoticeCnt = 0
                state.commentNoticeCnt = 0
                state.subscribeNoticeCnt = 0
                state.zanBookNoticeCnt = 0
            }
        }
    }
}