import axios from 'axios'
export default {
    state: {
        totalTop: [],
        totalTopName: [],
        draftForm: {
            title: 'aa',
            topic: 'ss',
            cover: 'dd',
            content: 'ff',
            isNewArticle: 1, // 当用户修改帖子的话（对草稿/已发布帖子）将这个赋为帖子tid
        },
    },
    getters: {},
    mutations: {
        // 同步方法
        setTotalTop(state, payload) {
            state.totalTop = payload
        },
        setTotalTopName(state, payload) {
            state.totalTopName = payload
        },
        setDraftForm(state, payload) {
            state.draftForm = payload
        },
        changeImg(state, payload) {
            state.draftForm = payload
        },
        setIsNewArticle(state, payload) {
            state.draftForm.isNewArticle = payload
        }
    },
    actions: {
        getTop(context, payload) {
            axios.get('http://localhost:8090/admin/getAllArticle').then(res => {
                context.commit('setTotalTop', res.data.allarticles)
                context.commit('setTotalTopName', res.data.ownerlist)
                var zanCnt = new Array() // 与下面的声明是一样的，但是不能一次声明多个
                var commentCnt = []
                var bookCnt = []
                for (let i = 0; i < context.state.totalTop.length; i++) {
                    if (context.state.totalTop[i].zan != '')
                        zanCnt.push(context.state.totalTop[i].zan.split("-").length) // 与arr[i] = xx作用一样
                    else
                        zanCnt.push(0)
                    if (context.state.totalTop[i].book != '')
                        bookCnt[i] = context.state.totalTop[i].book.split("-").length
                    else
                        bookCnt[i] = 0
                    if (context.state.totalTop[i].comment != '')
                        commentCnt[i] = context.state.totalTop[i].comment.split("-").length
                    else
                        commentCnt[i] = 0

                    // 新增属性Cnt，计算帖子综合得分，点赞评论和收藏的权重分别为1、1.5、1.2，还要考虑发布日的时间差防止一直霸榜
                    context.state.totalTop[i].Cnt = (zanCnt[i] + commentCnt[i] * 1.5 + bookCnt[i] * 1.2) * 10 + 100

                    // 最新、最热、增长速度、最近一周最热
                    // 计算帖子发布至今的时间差，用于计算综合评分
                    let diff = new Date() - new Date(context.state.totalTop[i].create_time) // 结果是时间戳
                        // 新增帖子创建距今天数用于获取最新帖子
                    context.state.totalTop[i].day = diff / 1000 / 24 / 3600
                    diff = Math.pow(Math.log((diff + 1) / (1000 * 3600 * 24)), 2)
                    if (diff > context.state.totalTop[i].Cnt)
                        context.state.totalTop[i].Cnt += diff
                    else
                        context.state.totalTop[i].Cnt -= diff

                    context.state.totalTop[i].Cnt = Math.ceil(context.state.totalTop[i].Cnt) // 向上取整
                    context.state.totalTopName[i].Cnt = context.state.totalTop[i].Cnt
                }
                // console.log(context.state.totalTop)
                context.state.totalTop.sort(function(a, b) { // 打算封装在mutation中的，结果调用没用——mutation不能返回值
                    let value1 = a['Cnt']; // 对象数组按照上面新增的Cnt的属性大小排序
                    let value2 = b['Cnt'];
                    // 降序排列
                    return value2 - value1;
                })
            })
        },
    }
}