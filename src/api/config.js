import axios from 'axios'

// 创建axios实例
const service = axios.create({
    // 请求超时时间
    timeout: 2000
})

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        console.log(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        let res = {}
            // if(response.status == 200)
        res.status = response.status
        res.data = response.data
        return res
    }, err => console.log(err)
)
export default service