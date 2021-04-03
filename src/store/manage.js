// import axios from "axios"
import router from "../router"

export default {
    state: {
        menuActive: '2-1',
        tabPane: [{
            manage: 'userManage',
            analyse: 'postAnalyse',
            feedback: 'userFeedback', // 反馈
            config: 'config1',
        }]
    },
    mutations: {
        setMenuActive(state, val) {
            state.menuActive = val
        },
        setTabPane(state, payload) {
            switch (payload.key) {
                case 'manage':
                    state.tabPane[0].manage = payload.value;
                    break;
                case 'analyse':
                    state.tabPane[0].analyse = payload.value;
                    break;
                case 'feedback':
                    state.tabPane[0].feedback = payload.value;
                    break;
                case 'config':
                    state.tabPane[0].config = payload.value;
                    break;
            }
        }
    }
}