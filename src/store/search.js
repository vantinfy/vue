import axios from "axios"
import router from "../router"

export default {
    state: {
        keyword: ''
    },
    mutations: {
        search(state, payload) {
            state.keyword = payload.keyword
            router.push('/search/keyword=' + payload.keyword)
        },
        setkey(state, val) {
            state.keyword = val
        }
    }
}